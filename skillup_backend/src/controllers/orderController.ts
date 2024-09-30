import { NextFunction, Request, Response } from "express";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";
import { newOrderRequestBody } from "../types/types.js";
import { Order } from "../models/orderModel.js";
import { invalidCache, reduceStock } from "../utils/features.js";
import { nodeCache } from "../index.js";



// new Order Created 
export const newOrder = async (req: Request<{}, {}, newOrderRequestBody>, res: Response, next: NextFunction) => {
   try {
      const { shippingInfo, user, subtotal, tax, discount, shippingcharges, total, orderItems } = req.body;
      console.log("Order Request", req.body);

      if (
         !shippingInfo ||
         !orderItems ||
         !user ||
         !subtotal ||
         !tax ||
         !shippingcharges ||
         !discount ||
         !total
      ) {
         return next(new ClassErrorHandler("Please All Fields fill", 500));
      }


      let order = await Order.create({
         shippingInfo,
         orderItems,
         user,
         subtotal,
         tax,
         shippingcharges,
         discount,
         total,
      });



      if (!order) {
         return next(new ClassErrorHandler("Order  not Created", 500));
      };

      await invalidCache({
         product: true,
         order: true,
         admin: true,
         userId: String(order?.user),
         orderId: String(order?._id),
      });

      if (order) {
         return res.json({
            status: true,
            message: "Order Created",
            order: order
         });
      }


      await reduceStock(orderItems);





   } catch (error: any) {
      return new ClassErrorHandler(error?.message, 500);
   }
};


// Get My Order  Details


export const myOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // i find the user id in Order Model Collection and get the Order details 

      const { id: user } = req.query;

      let orders = [];

      if (nodeCache.has(`my-order-${user}`)) {
         orders = JSON.parse(nodeCache.get(`my-order-${user}`) as string)
      } else {
         orders = await Order.find({ user });
         nodeCache.set(`my-order-${user}`, JSON.stringify(orders));
      };



      return res.json({
         status: true,
         order: orders
      }).status(200);

   } catch (error: any) {
      return next(new ClassErrorHandler(error?.message, 500));
   };
};



// get All orders from Database COllection 


export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
   try {

      let orders = [];

      if (nodeCache.has("all-orders")) {
         orders = JSON.parse(nodeCache.get("all-orders") as string);
      } else {

         //  populat means that are one object are insider user id then put the 
         // poulate the user id all get data user  & only fetch the name then
         //secoend paramter the user under the key put only one that can fetch and get data ;
         // orders = await Order.find().populate("user","name");

         orders = await Order.find().populate("user", "name");
         nodeCache.set("all-orders", JSON.stringify(orders));
      };

      return res.json({
         status: true,
         orders
      }).status(200);

   } catch (error: any) {
      return next(new ClassErrorHandler(error?.message, 500));
   }
};


//    get a Single  Order details

export const getSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {


      const { id } = req.params;

      let order;

      if (nodeCache.has(`single-order-${id}`)) {
         order = JSON.parse(nodeCache.get(`single-order-${id}`) as string);
      } else {

         order = await Order.findById(id).populate("user", "name");
         nodeCache.set(`single-order-${id}`, JSON.stringify(order));
      };

      return res.json({
         status: true,
         order
      }).status(200);

   } catch (error: any) {
      return next(new ClassErrorHandler(error?.message, 500));
   }
};






// Single  Order delete

export const singleOrderDelete = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;
      const order = await Order.findByIdAndDelete(id);
      if (!order) {
         return next(new ClassErrorHandler("Order Not Found", 500));
      };

      await invalidCache({
         product: false,
         order: true,
         admin: true,
         userId: order?.user,
         orderId: String(order?._id)
      });


      return res.json({
         status: true,
         message: "Order deleted successfully"
      }).status(200);

   } catch (error: any) {
      return next(new ClassErrorHandler(error?.message, 500));
   }
};


//   process order status change updates 


export const processOrder = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { id } = req.params;

      const order = await Order.findById(id);

      if (!order) {
         return res.json({
            status: false,
            message: "Order not found"
         }).status(500);
      };

      switch (order?.status) {
         case "Processing": order.status = "Shipped"
            break;
         case "Shipped": order.status = "Delivered"
         default: "Delivered"
      };

      await order.save();

      // delete Cache from Ram memory 
      await invalidCache({
         product: false,
         order: true,
         admin: true,
         userId: order?.user,
         orderId: String(order?._id)
      });


      return res.json({
         status: true,
         message: "Order Placed successfully",
         order
      }).status(200);


   } catch (error: any) {
      return next(new ClassErrorHandler(error?.message, 500));
   }
}


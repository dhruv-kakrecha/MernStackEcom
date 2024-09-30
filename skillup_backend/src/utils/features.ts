import mongoose from "mongoose";
import { Product } from "../models/productModel.js";
import { nodeCache } from "../index.js";
import { OrderItems } from "../types/types.js";
import { Order } from "../models/orderModel.js";


export async function ConnectDatase(MONGO_URL: string) {
    try {
        const status = await mongoose.connect(MONGO_URL, {
            dbName: "skillup_backend",
        });

        if (status) {
            console.log(`DB connection to ${status.connection.host || "ATLAS"}`)
        }

    } catch (error) {
        console.log("Database Conntected Error", error);
    }

};

interface inValiedCacheProps {
    product?: boolean,
    order?: boolean,
    admin?: boolean,
    userId?: string,
    orderId?: string | any,
    productId?: string
}



export const invalidCache = async ({ product, order, admin, userId, orderId, productId }: inValiedCacheProps) => {

    if (product) {
        const productCacheKeys = ["latest_product", "categories", "products"];
        // `product-${id}`

        const products = await Product.find({}).select("_id");
        if (products.length > 0) {
            console.log("Cache products", products);
            products.forEach(ids => {
                productCacheKeys.push(`single_product-${ids?._id}`);
            });
        }
        nodeCache.del(productCacheKeys);
    };

    if (order) {
        const OrderKeys = ["all-orders", `my-order-${userId}`, `single-order-${orderId}`];
        nodeCache.del(OrderKeys);
    };

    if (admin) {
        const dashBoardkeys = ["stats_diagram", "pieCharts", "bar-charts"];
        nodeCache.del(dashBoardkeys);
    }

};



export const reduceStock = async (orderItems: any) => {
    for (let i = 0; i < orderItems?.length; i++) {
        const order = orderItems[i];
        const product = await Product.findById(order.proudctId);
        if (!product) {
            throw new Error("Product not found");
        }
        product.stock = product.stock - order.quantity;
        await product.save();
    }

};

//   calculate  percentage of Dashboard Digram length 
export const calculatePercentage = (thisMonth: number, LastMonth: number) => {

    if (LastMonth == 0) {
        return thisMonth * 100
    }

    const percentage = (thisMonth - LastMonth) * 100;
    return Number(percentage.toFixed(0));
}
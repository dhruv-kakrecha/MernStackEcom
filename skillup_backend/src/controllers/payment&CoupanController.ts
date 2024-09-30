import { strip } from "../index.js";
import { Coupan } from "../models/coupanModel.js";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";
import { Request, Response, NextFunction } from "express";

// Create a Payment 
export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return next(new ClassErrorHandler("Please provide  amount", 400));
    };

    const payment = await strip.paymentIntents.create({
      amount: Number(amount) * 100,
      currency: 'inr'
    });

    return res.json({
      status: true,
      clientSecret: payment.client_secret
    }).status(200);


  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 500));
  }
};





// New Coupan Create 
export const newCoupan = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { coupan, amount } = req.body;
    if (!coupan || !amount) {
      return next(new ClassErrorHandler("Please provide valid coupan and amount", 400));
    }
    await Coupan.create({ coupan, amount });

    return res.json({
      status: true,
      message: "New Coupan added successfully",
    }).status(200);


  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 500));
  }
};

//  Apply Discount 

export const applyDiscount = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { coupan } = req.query;

    const discount = await Coupan.findOne({ coupan });

    if (!discount) {
      return next(new ClassErrorHandler("Invalid Coupan", 500));
    };

    return res.json({
      status: true,
      discount: discount.amount,
      message: " Discount Apply Successfully"
    }).status(200);

  } catch (error: any) {
    return next(new ClassErrorHandler(error.message, 500));
  }
}


//   Get All Coupan 


export const getAllCoupans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const coupans = await Coupan.find({});
    return res.json({
      status: true,
      coupans,
      message: "All coupons fetched successfully",
    }).status(200);
  } catch (error: any) {
    return next(new ClassErrorHandler(error.message, 500));
  }
};





//   Delete  Single delete 



export const deleteCoupan = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { id } = req.params;
    const coupans = await Coupan.findByIdAndDelete(id);
    if (!coupans) {
      return next(new ClassErrorHandler("Coupons Invalid", 500));
    }
    return res.json({
      status: true,
      coupans,
      message: "coupan delete successfully ",
    }).status(200);
  } catch (error: any) {
    return next(new ClassErrorHandler(error.message, 500));
  }
};


//    
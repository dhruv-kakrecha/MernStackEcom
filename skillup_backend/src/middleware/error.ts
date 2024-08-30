import express, { Response, Request,NextFunction } from "express";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";


export const errorMiddleware =(err:ClassErrorHandler,req:Request,res:Response,next:NextFunction)=>{
      console.log("error middleware",err)
    return res.json({
      status: err.statusCode || 500,
      message: err?.message || "INTERNAL SERVER ERROR 😒",  
    }).status(400);
 };
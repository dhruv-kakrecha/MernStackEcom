import { NextFunction,Request ,Response} from "express";
import { User } from "../models/userModel.js";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";


export const  AuthAdmin = async(req:Request,res:Response,next:NextFunction)=>{

   try {
         console.log("Query",req.query);
      const {id} = req.query;
      if(!id){
         return   next(new ClassErrorHandler("Unauthorized Access",401));
      };
   
       const user =await  User.findById(id);
       
       if(!user){
           return next(new ClassErrorHandler("User Not Found",401));
        };    
       
        if(user?.role!=="admin"){
           return next(new ClassErrorHandler("User  Not Access Data",401));
        };

        next();
        
   } catch (error:any) {
      return   next(new ClassErrorHandler(error?.message,401));
   };


};
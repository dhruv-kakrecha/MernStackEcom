import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel.js";
import { NewUserRequesrBody } from "../types/types.js";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";



export async function newUser(
  req: Request<{}, {}, NewUserRequesrBody>,
  res: Response,
  next: NextFunction
) {
  try {
 
    
    const { _id, name, email, gender, dob, photo } = req.body;
   
    if( !_id || !name || !email || !gender ||  !dob || !photo){
      return next(new ClassErrorHandler("Please add All Fields",500))
    } 

    let user = await User.findById(_id);
      
    if(user){
      return res.json({
        status: true,
        message: `Welcome ${user?.name}`,
      }).status(200);
    }
   


    // Ensure dob is converted to a Date object
     user = await User.create({
      _id,
      name,
      email,
      gender,
      dob: new Date(dob), // Use the parsed Date object
      photo,
    });
    
    return res.status(201).json({
      status: true,
      message: `Welcome ${user?.name}`,
    });
  } catch (error: any) {
    // throw new Error("Errro thorow")
    return next(new ClassErrorHandler(error?.message,500));
  }
}



export const getAllUsers=(req:Request,res:Response,next:NextFunction)=>{
   try {
   
  const users = User.find();
  if(users){
     return res.json({
       status:true,  
       users:users
      });
 }
   } catch (error:any) {
       return next(new ClassErrorHandler(error?.message,500))
   }
   
};

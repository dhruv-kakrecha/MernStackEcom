import { Request, Response, NextFunction } from "express";
import { User } from "../models/userModel.js";
import { NewUserRequesrBody } from "../types/types.js";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";


//  Create a new User
export async function newUser(

  req: Request<{}, {}, NewUserRequesrBody>,
  res: Response,
  next: NextFunction
) {
  try {


    const { _id, name, email, gender, dob, photo, role } = req.body;

    if (!_id || !name || !email || !gender || !dob || !photo || !role) {
      return next(new ClassErrorHandler("Please add All Fields", 500))
    }

    let user = await User.findById(_id);

    if (user) {
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
      role
    });

    return res.status(201).json({
      status: true,
      message: `Welcome ${user?.name}`,
    });
  } catch (error: any) {
    // throw new Error("Errro thorow")
    return next(new ClassErrorHandler(error?.message, 500));
  }
}


//  get the all  users 
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const users = await User.find();
    if (users) {
      return res.json({
        status: true,
        users: users
      }).status(200);
    }
  } catch (error: any) {
    return next(new ClassErrorHandler(error?.message, 500))
  }

};


//  get the Signle USer
export const getSingleUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ClassErrorHandler("ID Not Found", 500));
    };
    const user = await User.findById(id);

    if (!user) {
      return next(new ClassErrorHandler("user Not Found", 500));
    };

    if (user) {
      return res.json({
        status: true,
        user: user
      }).status(200);
    }
  } catch (error: any) {
    return next(new ClassErrorHandler(error.message, 500));
  }
}



//  Signle USer delete
export const SingleUserDelete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(new ClassErrorHandler("ID Not Found", 500));
    };
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new ClassErrorHandler("user Not Found", 500));
    };

    if (user) {
      return res.json({
        status: true,
        message: `${user?.name || "user"} Delete Successfully`
      }).status(200);
    }
  } catch (error: any) {
    return next(new ClassErrorHandler(error.message, 500));
  }
}

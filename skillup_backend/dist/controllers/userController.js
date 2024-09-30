import { User } from "../models/userModel.js";
import ClassErrorHandler from "../utils/ClassErrorHandler.js";
//  Create a new User
export async function newUser(req, res, next) {
    try {
        const { _id, name, email, gender, dob, photo } = req.body;
        if (!_id || !name || !email || !gender || !dob || !photo) {
            return next(new ClassErrorHandler("Please add All Fields", 500));
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
        });
        return res.status(201).json({
            status: true,
            message: `Welcome ${user?.name}`,
        });
    }
    catch (error) {
        // throw new Error("Errro thorow")
        return next(new ClassErrorHandler(error?.message, 500));
    }
}
//  get the all  users 
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users) {
            return res.json({
                status: true,
                users: users
            }).status(200);
        }
    }
    catch (error) {
        return next(new ClassErrorHandler(error?.message, 500));
    }
};
//  get the Signle USer
export const getSingleUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ClassErrorHandler("ID Not Found", 500));
        }
        ;
        const user = await User.findById(id);
        if (!user) {
            return next(new ClassErrorHandler("user Not Found", 500));
        }
        ;
        if (user) {
            return res.json({
                status: true,
                users: user
            }).status(200);
        }
    }
    catch (error) {
        return next(new ClassErrorHandler(error.message, 500));
    }
};
//  Signle USer delete
export const SingleUserDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ClassErrorHandler("ID Not Found", 500));
        }
        ;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(new ClassErrorHandler("user Not Found", 500));
        }
        ;
        if (user) {
            return res.json({
                status: true,
                message: `${user?.name || "user"} Delete Successfully`
            }).status(200);
        }
    }
    catch (error) {
        return next(new ClassErrorHandler(error.message, 500));
    }
};

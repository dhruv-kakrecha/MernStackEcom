import { User } from "../models/userModel.js";
export async function newUser(req, res, next) {
    try {
        const { _id, name, email, gender, dob, photo } = req.body;
        // Ensure dob is converted to a Date object
        const parsedDob = new Date(dob);
        const user = await User.create({
            _id,
            name,
            email,
            gender,
            dob: parsedDob, // Use the parsed Date object
            photo,
        });
        return res.status(200).json({
            status: true,
            message: `Welcome ${user?.name}`,
        });
    }
    catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message,
        });
    }
}

// const mongoose = require('mongoose');
import mongoose from "mongoose";
import validator from "validator";
const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: [true, "Please Enter a Id"],
    },
    name: {
        type: String,
        required: [true, "Please  Enter a Name"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please Enter a Email"],
        validate: validator.default.isEmail,
    },
    photo: {
        type: String,
        required: [true, "Please Add a Photo"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: [true, "Please Add a Gender"]
    },
    dob: {
        type: Date,
        required: [true, "Please Enter a Date Of Birth"],
    }
}, {
    timestamps: true
});
UserSchema.virtual("age").get(function () {
    console.log("DOB", this.dob);
    const today = new Date(this?.dob);
    const dob = this.dob;
    let age = today?.getFullYear() - dob?.getFullYear();
    if (today?.getMonth() < dob?.getMonth() ||
        (today?.getMonth() == dob?.getMonth() && today?.getDate() < dob?.getDate())) {
        age--;
    }
    ;
    return age;
});
export const User = mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const CoupanSchema = new mongoose.Schema({

    coupan :{
        type:String,
        required:[true,"Please Enter the Coupan Code"],
        unique: true
    },
    amount:{
        type:Number,
        required:[true,"Please Enter a Discount Amount"]
         }
});


export const Coupan = mongoose.model("coupan",CoupanSchema);
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"Please Enter a Product Name"]
  },
  photo:{
    type:String,
    required:[true,"Please Add a Product Photo"]
  },
  price:{
    type:Number,
    required:[true,"Please Enter a Product Price"]
  },
  stock:{
    type:Number,
    required:[true,"Please Enter a Product Stock"]
  },
  description: {
    type: String,
    required: [true, "Please enter Description"],
  },
  category:{
    type:String,
    required:[true,"Please Select a Product Category"],
    trim:true,
}
},
{
    timestamps:true,
}

);


export  const Product = mongoose.model("product",productSchema);
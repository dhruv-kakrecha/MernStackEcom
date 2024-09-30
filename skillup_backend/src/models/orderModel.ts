import mongoose from "mongoose";


const OrderSchema = new mongoose.Schema({

    shippingInfo :{
        address:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        pincode:{
            type:Number,
            required:true,
        }
    },

    //  which user are get a new Order 
    user:{
        type:String,
        ref:"User",
        required:true,
    },
       subtotal:{
        type:Number,
        required:true,
       },
       tax:{
        type:Number,
        required:true,
       },
       discount:{
        type:Number,
        required:true,
       },
       shippingcharges:{
        type:Number,
        required:true,
       },
       total:{
        type:Number,
        required:true,    
       },
       status:{
        type:String,
        default:"Processing",
        enum:["Processing","Shipped","Delivered"],
       },
       orderItems:[
        {
            name:String,
            photo:String,
            price:Number,
            quantity:Number,
            productId:{
                type:mongoose.Types.ObjectId,
                ref:"Product"
            } 


        }
       ]


},{
  timestamps:true,
});

export  const Order  = mongoose.model('order', OrderSchema);
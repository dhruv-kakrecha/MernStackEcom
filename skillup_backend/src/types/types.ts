
// new User Request types
export interface NewUserRequesrBody{
    _id:string,
    name:string,
    email:string,
    photo:string,
    gender:string,
    dob:Date,
    role:string
};

//  new Product Request Type

export interface NewProductRequest{
    name:string,
    stock:number,
    price:number,
    category:string,
    description: string
};


export interface SearchRequestQuery{
    search?:string,
    price?:number,
    category?:string,   
    sort?:number,
    page?:number,
};


//    search  filter parameters 
// export interface Search {
//    name:{
//        $regex?:string;
//        $options?:string
//    },
//    price:{
//     $lte?:number,
//    },
//    category?:string, 
// }


//  Order types Starts

//  shipping Info Types 
  export  interface ShippingInfo{
   address:string,
   city:string,
   state:string,
   country:string,
   pincode:number,
  }

//   OrderItems type 

  export interface OrderItems {
    orderItems: number
    name:string,
    photo:string,
    price:number,
    quantity:number,
    proudctId:string,
  }
 export interface newOrderRequestBody{
   shippingInfo:ShippingInfo,
   user:string,
   subtotal:number,
   tax:number,
   discount:number,
   shippingcharges:number,
   total:number,
   status:string,
   orderItems:OrderItems
  };




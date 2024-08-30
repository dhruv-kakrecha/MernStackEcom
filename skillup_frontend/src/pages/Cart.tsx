import React, { useEffect, useState } from "react";
import  {VscError} from "react-icons/vsc";
import CartItem from "../components/CartItem";

  const cartItems: any[] = [
  {
    _id:"kjgjkdhfghd",
    photo:"'https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg",
    name:"dummany product",
    price:13245,
    stock:52, 
    quantity:55,
  }
  ];

  const subtotal = 645645;
  const tax = Math.round(subtotal * 0.18);
  const shippingCharges = 200;
  const discount = 400 ;
  const total = subtotal + tax + shippingCharges;

const Cart = () => {
 
    const [coupanCode,setCoupanCode]=useState<string>('');
    const [isValidCoupanCode,setIsValidCoupanCode]=useState<boolean>(false);

       useEffect(()=>{
         
       const setTime = setTimeout(() => {
               
               if(Math.random()>0.5){
                setIsValidCoupanCode(true);
               }else{
                setIsValidCoupanCode(false)
               }

        },1000);
        
        return(()=>{
          clearTimeout(setTime)
          setIsValidCoupanCode(false)
        })

       },[coupanCode]);

   return <div className="cart">
      <main>
        {
          cartItems?.map((item)=>(
            <CartItem cart={item}/>
          ))
        }

      </main>

      <aside>
            <p>SubTotal : RS {subtotal}</p>
            <p>Shipping Charges : RS{shippingCharges}</p>
            <p>Tax : RS{tax} </p>
            <p>Discount : <em> - RS {}</em>{discount}</p>
             <p><b>Total : RS {total}</b></p>
        <input type="text" name={"coupan"} value={coupanCode} onChange={(e)=>setCoupanCode(e.target.value)} placeholder="Coupan Code"/>
      </aside>
            
            {
              coupanCode && (
                isValidCoupanCode ? (
                  <span className="green"> RS {discount}  off using the <code>{coupanCode}</code></span>
               ):(
                 <span className="red">InValied Coupan <VscError/> </span>
               )
              )

              
             }

    </div>;
};

export default Cart;

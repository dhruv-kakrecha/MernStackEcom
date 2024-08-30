import React, { useState } from 'react'
import {  NavLink } from 'react-router-dom'

   type CartProps = {
     cart:any
   }

const CartItem = ({cart}:CartProps) => {

      const [quantity,setQuantity] = useState<number>(10);

       function call(quantity:number){
          if(1 <= quantity ){
            setQuantity(quantity)
           }else{
            if(0==quantity){
              return;
            }else{
                setQuantity(quantity)
            }
        }
       }
       


  return (
    <div className='cart-item'>
      <img src={cart?.photo}/>
      <article>
         <NavLink to={`/product/${cart?._id}`}>{cart?.name}</NavLink>
         <span>{cart?.price}</span>
      </article>
         
         
    
        <div>
             <button onClick={()=>call(quantity+1)}>+</button>
              <p>{quantity}</p>
             <button onClick={()=>call(quantity-1)}>-</button>   
        </div>


    </div>
  )
}

export default CartItem

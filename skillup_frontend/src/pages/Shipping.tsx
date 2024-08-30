import React, { ChangeEvent, useState } from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const Shipping = () =>{

      const navigate = useNavigate();

   const [shippingInfo,setShippingInfo] = useState<any>({
      address:"",
      city:"",
      state:"",
      country:"",
      pincode:""
   });


   const changHandler = (e: ChangeEvent<HTMLSelectElement | HTMLInputElement>) =>{
    console.log("value",e.target.value);
       
    const {name,value} = e.target;
          setShippingInfo([{...shippingInfo,[name]:value}])
   };

    return (
    <div className='shipping'>
      <button onClick={()=>navigate("/cart")} className='back-btn'>
        <BiArrowBack/>
      </button>
        
        <form>
          <h1>Shipping cart</h1>
               
           <input type="text" name='address' value={shippingInfo?.address}  onChange={changHandler}  placeholder='Address' required/>
           <input type="text" name='city' value={shippingInfo?.city}  onChange={changHandler}  placeholder='City' required/>
           <input type="text" name='state' value={shippingInfo?.state}  onChange={changHandler}  placeholder='State' required/>
              
             <select name='country' value={shippingInfo?.country} onChange={changHandler}>
                   <option value={''}>select</option>      
                  <option value={"pune"}>{'pune'}</option>      
                  <option value={"mumbai"}>{'mumbai'}</option>      
              </select>

           <input type="number" name='pincode' value={shippingInfo?.pincode}  onChange={changHandler}  placeholder='PinCode' required/>

                    
      <button>
        <h2>pay now</h2>
      </button>
      
        </form>
   
     
     </div>
  )
}

export default Shipping

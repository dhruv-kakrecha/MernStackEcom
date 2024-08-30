import React, { FC, useState } from 'react';
import { FaSearch, FaShoppingBag, FaSignInAlt,FaSignOutAlt, FaUser } from 'react-icons/fa';
import {NavLink } from 'react-router-dom';



    interface  UserType{
   _id:number,
   role:string
 }

const user : UserType= {
  _id:12345,
  role:"admin" 
}

const Header:React.FC = () => {

  const [isOpen,setIsOpen] = useState(false);

  const logoutHandler = ()=>{
         setIsOpen(false);       
  };
 
  return (
    <nav className='header'> 
        <NavLink to={'/'} onClick={()=>setIsOpen(false)}>Home</NavLink>
        <NavLink to={"/search"} onClick={()=>setIsOpen(false)}><FaSearch/></NavLink>  
        <NavLink to={"/cart"} onClick={()=>setIsOpen(false)}><FaShoppingBag/></NavLink>
          {
            user?._id ? (
                 <>
                <button onClick={()=>setIsOpen((pre)=>!pre)}>
                    <FaUser/>
                 </button>
                 <dialog open={isOpen}>
                  <div>
                    {
                      user?.role==="admin" && (
                         <>
                        <NavLink to={"/admin/dashboard"} onClick={()=>setIsOpen(false)}>Admin</NavLink>
                         </>
                      ) 
                    }
                  </div>
                    
                     <>
                       <NavLink to={"/orders"} onClick={()=>setIsOpen(false)}>Orders</NavLink>
                        <button onClick={logoutHandler}><FaSignOutAlt/></button>
                     </>

                 </dialog>
                 </>
            ):(
              <>
              <NavLink to={"/login"}><FaSignInAlt/></NavLink>
              </>
            )
          }
    </nav>
  )
}

export default Header;

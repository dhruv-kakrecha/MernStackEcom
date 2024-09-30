import React, { FC, useState } from 'react';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { USer } from '../types/types';


const Header: React.FC = ({ user }: any) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = () => {
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <nav className='header'>
      <NavLink to={'/'} onClick={() => setIsOpen(false)}>Home</NavLink>
      <NavLink to={"/search"} onClick={() => setIsOpen(false)}><FaSearch /></NavLink>
      <NavLink to={"/cart"} onClick={() => setIsOpen(false)}><FaShoppingBag /></NavLink>
      {
        user?._id ? (
          <>
            <button onClick={() => setIsOpen((pre) => !pre)}>
              <FaUser />
            </button>
            <dialog open={isOpen}>
              <div>
                {
                  user?.role === "admin" && (
                    <>
                      <NavLink to={"/admin/dashboard"} onClick={() => setIsOpen(false)}>Admin</NavLink>
                    </>
                  )
                }
              </div>

              <>
                <NavLink to={"/orders"} onClick={() => setIsOpen(false)}>Orders</NavLink>
                <button onClick={logoutHandler}><FaSignOutAlt /></button>
              </>

            </dialog>
          </>
        ) : (
          <>
            <NavLink to={"/login"}><FaSignInAlt /></NavLink>
          </>
        )
      }
    </nav>
  )
}

export default Header;

import React, { FC } from 'react'
import { FaPlus } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';


type ProductProps = {
  productId: string,
  photo: string,
  name: string,
  price: number,
  stock: number,
  quantity: number,
  handleAddProductToCart: () => void,

}

const ProductCard = ({ productId, photo, name, price, stock, quantity, handleAddProductToCart }: ProductProps) => {
  return (
    <>
      <div className='productCard' key={productId}>
        <img src={photo} alt={name || "photo"} />
        <p>{name}</p>
        <span>{price}</span>

        <div className='productCartHover'>
          <button onClick={() => handleAddProductToCart()}><FaPlus /></button>
        </div>
      </div>
    </>
  )
}

export default ProductCard;

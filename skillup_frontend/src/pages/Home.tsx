import React from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const Home: React.FC = () => {

   const handleAddProductToCart=()=>{};
  return( 
  <>
      <div className="home">
          <section>
          
          </section>
           <h1>
              Latest Products
              <NavLink to={"/search"} className={"findmore"}>
                 More
              </NavLink>   
            </h1>        
             <main>
                   <ProductCard 
                      productId={"productId"}
                      photo={'https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg'}
                      name={'name'}
                      price={1000}
                      stock={1} 
                      quantity={3}
                      handleAddProductToCart={handleAddProductToCart} 
                   />
               
             </main>
      </div>
  </>);
};
export default Home;

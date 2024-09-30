import React from "react";
import { NavLink } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useGetProductsQuery } from "../redux/api/productApi";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Skeleton } from "../components/admin/Loader";

const Home: React.FC = () => {

   const { data, isLoading, isError } = useGetProductsQuery();

   console.log("products", data);
   if (isError) {
      toast.error("Products not Fetched");
   }
   const handleAddProductToCart = () => { };
   return (
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
               {isLoading ? <Skeleton width={"100%"} /> :
                  data?.product?.map((item: any) => (
                     <ProductCard
                        productId={item?._id}
                        photo={item?.photo}
                        name={item?.name || "No Item"}
                        price={item?.price || 0}
                        stock={item?.stock || 0}
                        quantity={item?.quantity || 0}
                        handleAddProductToCart={handleAddProductToCart}
                     />
                  ))
               }


            </main>
         </div>
      </>);
};
export default Home;

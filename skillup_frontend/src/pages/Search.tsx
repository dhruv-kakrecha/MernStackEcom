import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const Search = () => {
   
  const [sort,setSort] = useState<string>("");
  const [maxPrice,setMaxPrice] = useState<number>(100000);
  const [category,setCategory]= useState<string>("");
  const [page,setPage]=useState(1);
  const [search,setSearch]  = useState<string>("");

  console.log("search",search)


    const handleAddProductToCart =()=>{

    }
 
    const isPrePage = page  > 1;
    const isNextPage = page < 10;

  return(
  <>
 <div className="product-searh-page">
   <aside>
      <h2>Filters</h2>
      <div>
        <h4>Sort</h4>
        <select name="sort" value={sort} onChange={(e:React. ChangeEvent<HTMLSelectElement>)=>setSort(e.target.value)}>
          <option value={""}>None</option>
          <option value={"asc"}>Price (Low To High)</option>
          <option value={"dsc"}>Price (High To Low)</option>
        </select>
      </div>  
  
<div>
  <h4>Max Price {maxPrice || 100}</h4>
  <input type="range" min={100} max={10000}  name="maxPrice" value={maxPrice} onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
      setMaxPrice(Number(e.target.value))
    }
  />
</div>


<div>
        <h4>Category</h4>
        <select name="category" value={category} onChange={(e:React.ChangeEvent<HTMLSelectElement>)=>setCategory(e.target.value)}>
          <option value={""}>All</option>
          <option value={"camera"}>Camera</option>
          <option value={"game"}>Game</option>
          <option value={"phone"}>Phone</option>
        </select>
      </div>  

   </aside>
   <main>
    <h1>Products</h1>
    <input  type="text" placeholder="Seacrh by name..." name="search" value={search} onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} />
  
  
  <div  className="product-list-page">
  <ProductCard
       productId={"productId"}
       photo={'https://cdn.pixabay.com/photo/2020/10/21/18/07/laptop-5673901_1280.jpg'}
       name={'name'}
       price={1000}
       stock={1} 
       quantity={3}
       handleAddProductToCart={handleAddProductToCart} 

      />
  </div>
    
                    <article>
                     <button disabled={!isPrePage} onClick={()=>setPage((pre)=>pre-1)}>Prev</button>
                     <span>{page} of {4}</span>
                     <button disabled={!isNextPage} onClick={()=>setPage((pre)=>pre+1)}>Next</button>
                    </article>
   </main>
</div>
  </>
 
  );
};

export default Search; 

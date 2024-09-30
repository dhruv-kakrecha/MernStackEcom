import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import toast from "react-hot-toast";
import { useGetSingleProductQuery, useUpdateProductMutation, userDeleteProductMuation } from "../../../redux/api/productApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";

const placeholderImg =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const Productmanagement = () => {
  const { id } = useParams();
  const { user, loading } = useSelector((state: { userReducer: UserReducerInitialState }) => state?.userReducer);
  const { data, isLoading, isError } = useGetSingleProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = userDeleteProductMuation();

  // Single state object for all product updates
  const [productDetails, setProductDetails] = useState({
    price: 0,
    stock: 0,
    name: "",
    category: "",
    description: "",
    photo: placeholderImg,
    photoFile: null as File | null,
  });

  const [imgFile, setFile] = useState<any>();

  useEffect(() => {
    if (data?.product) {
      const { price, stock, name, category, photo, description } = data.product;
      setProductDetails({ price, stock, name, category, description, photo: photo || placeholderImg, photoFile: null });
    }
  }, [data]);

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFile(file);
        setProductDetails((prev: any) => ({
          ...prev, photo: reader.result, photoFile: file
        }));
      };
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      const { price, stock, name, category, description } = productDetails;
      // const update = { price, stock, name, category, photo:imgFile, id, description, userId: user?._id };

      //   set Form Data 

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("description", description);
      if (imgFile) {
        formData.append("photo", imgFile); // Append file to formData
      }

      const product = {
        formData,
        id,
        userId: user?._id
      };
      const { data } = await updateProduct(product);
      if (data?.status) {
        toast.success(data?.message || "Product updated successfully!");
      } else {
        toast.error(data?.message || "Product is Failed !");

      }

    } catch (error: any) {
      toast.error(error?.message || "Update failed");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product details.</p>;

  // product deleted

  async function handleProductDelete() {
    try {
      const state = {
        id,
        userId: user?._id
      }
      const { data } = await deleteProduct(state);
      if (data?.status) {
        toast.success(data?.message || "deleted Product successfully");
      } else {
        toast.error(data?.message || "Product not deleted !");
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }





  const { price, stock, name, category, photo, description } = productDetails;

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {data?.product?._id}</strong>
          <img src={photo} alt="Product" />
          <p>{name}</p>
          <span className={stock > 0 ? "green" : "red"}>
            {stock > 0 ? `${stock} Available` : "Not Available"}
          </span>
          <h3>₹{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={handleProductDelete}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={price}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={stock}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={category}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Description</label>
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={description}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>
            {photo && <img src={photo} alt="New Image" />}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;



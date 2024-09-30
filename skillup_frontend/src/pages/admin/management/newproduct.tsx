import { ChangeEvent, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useCreateProductMutation } from "../../../redux/api/productApi";
import toast from "react-hot-toast";
import { UserReducerInitialState } from "../../../types/reducer-types";
import { useSelector } from "react-redux";

const NewProduct = () => {
  const { user, loading } = useSelector((state: { userReducer: UserReducerInitialState }) => state?.userReducer);
  console.log("user", user);

  const [createProduct, isLoading, isSuccess, isError] = useCreateProductMutation();


  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();
  const [description, setDescription] = useState<string>("");

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };


  const handleCreateProduct = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("stock", stock);
      formData.append("category", category);
      formData.append("description", description);
      if (photo) {
        formData.append("photo", photo); // Append file to formData
      }
      const state = {
        formData,
        userId: user?._id
      }
      const { data } = await createProduct(state);
      if (data?.status) {
        toast.success(data?.message || "Product created successfully");
      } else {
        toast(data?.message || "Product not created successfully");
      }
    } catch (error: any) {
      toast.error(error?.message || "failed to create product !");
    }
  };


  // if (isLoading) return <p>Loading...</p>;
  // if (isError) return <p>{'Error fetching admin products'}</p>;
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <article>
          <form onSubmit={handleCreateProduct}>
            <h2>New Product</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label>description</label>
              <input
                type="text"
                placeholder="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" />}
            <button type="submit">Create</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default NewProduct;

import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useGetAdminProductsQuery } from "../../redux/api/productApi";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../types/reducer-types";
import toast from "react-hot-toast";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: Array<DataType> = [
  {
    photo: <img src={img} alt="Shoes" />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },

  {
    photo: <img src={img2} alt="Shoes" />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Products = () => {
  const { user, loading } = useSelector((state: { userReducer: UserReducerInitialState }) => state?.userReducer);

  // Using the RTK Query hook to fetch admin products
  const { data, isLoading, isError, error } = useGetAdminProductsQuery(user?._id);
  const [rows, setRows] = useState<DataType[]>([]);//arr



  useEffect(() => {
    if (data?.status && data?.product) {
      const productRows = data.product.map((item: any) => ({
        photo: <img src={`http://localhost:3000/uploads/${item?.photo}`} alt={item?.name} style={{ width: '50px' }} />,
        name: item?.name,
        price: item?.price,
        stock: item?.stock,
        action: <Link to={`/admin/product/${item?._id}`}>Manage</Link>,
      }));
      setRows(productRows);
    } else if (data && !data.status) {
      toast.error(data?.message || 'Failed to fetch products');
    }
  }, [data]);


  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows?.length > 6,
  )();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>{error?.message || 'Error fetching admin products'}</p>;
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;

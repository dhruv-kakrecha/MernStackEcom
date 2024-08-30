// Suspance mesns Loading
import React, { lazy, Suspense } from "react";
import "./styles/app.scss";

//  use a  design webpage styling scss

//  use a Routing
import { BrowserRouter, Routes, Route } from "react-router-dom";

// defaults Components
import Loader from "./components/Loader";
import Header from "./components/Header";
import OrderDetails from "./pages/OrderDetails";

// lazy loading components
const Home: React.ComponentType = lazy(() => import("./pages/Home"));
 const Cart : React.ComponentType = lazy(()=>import("./pages/Cart"));
 const Shipping : React.ComponentType = lazy(()=>import("./pages/Shipping"));
const Login : React.ComponentType = lazy(()=>import("./pages/Login"));
const Search : React.ComponentType = lazy(()=>import("./pages/Search"));
const Orders : React.ComponentType = lazy(()=>import("./pages/Orders"));

//  admin  routes  import
const Dashboard : React.ComponentType = lazy(() => import("./pages/admin/dashboard"));
const Products : React.ComponentType = lazy(() => import("./pages/admin/products"));
const Customers:React.ComponentType = lazy(() => import("./pages/admin/customers"));
const Transaction:React.ComponentType = lazy(() => import("./pages/admin/transaction"));
const Barcharts : React.ComponentType = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts : React.ComponentType = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts :React.ComponentType = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon : React.ComponentType  = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch : React.ComponentType = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss : React.ComponentType  = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct : React.ComponentType = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement : React.ComponentType = lazy(() => import("./pages/admin/management/productmanagement"));
const TransactionManagement = lazy(() => import("./pages/admin/management/transactionmanagement"));

const App: React.FC = () => {
  return (
    <>

        <BrowserRouter>
        <Header/>  
        
         <Suspense fallback={<><Loader /></>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart/>}/>

              {/* Not Loggined  In Route   */}
            <Route path="/login" element={<Login/>}/>

            
            {/* Login user Routes */}
            <Route>
             < Route path="/shipping" element={<Shipping/>}/>
              <Route  path="/order" element={<Orders/>}/>
              <Route  path="/order/:id" element={<OrderDetails/>}/>

            </Route>
            {/*  admin routes */}

            {/* serach route */}
            <Route path="/search" element={<Search/>}/>


{/*             
<Route
  element={
    <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
  }
>
*/}

  <Route path="/admin/dashboard" element={<Dashboard />} />
  <Route path="/admin/product" element={<Products />} />
  <Route path="/admin/customer" element={<Customers />} />
  <Route path="/admin/transaction" element={<Transaction />} />
  {/* Charts */}
  <Route path="/admin/chart/bar" element={<Barcharts />} />
  <Route path="/admin/chart/pie" element={<Piecharts />} />
  <Route path="/admin/chart/line" element={<Linecharts />} />
  {/* Apps */}
  <Route path="/admin/app/coupon" element={<Coupon />} />
  <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
  <Route path="/admin/app/toss" element={<Toss />} />

  {/* Management */} 
  <Route path="/admin/product/new" element={<NewProduct />} />
  <Route path="/admin/product/:id" element={<ProductManagement />} />
  <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
{/* </Route> */}
 

          </Routes>
         </Suspense> 
        </BrowserRouter>
    </>
  );
};

export default App;

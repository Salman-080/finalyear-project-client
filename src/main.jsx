import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root/Root.jsx';
import Home from './Pages/Home/Home.jsx';
import AddProducts from './Pages/AddProducts/AddProducts.jsx';
import Shop from './Pages/Shop/Shop.jsx';
import Provider from './Provider/Provider.jsx';
import ProductDetails from './Pages/ProductDetails/ProductDetails.jsx';
import Cart from './Pages/Cart/Cart.jsx';
import Register from './Pages/Register/Register.jsx';
import Update from './Pages/Update/Update.jsx';
import AllUsers from './Pages/AllUsers/AllUsers.jsx';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import AddExtraInfo from './Pages/AddProducts/AddProductsExtraInfo/AddExtraInfo.jsx';
import Dashboard from './AdminDashboard/Dashboard.jsx';
import AdminHome from './AdminDashboard/DashBoardPages/AdminHome/AdminHome.jsx';
import AddCategories from './AdminDashboard/DashBoardPages/AddCategories/AddCategories.jsx';
import ShopPage from './Pages/Shop/ShopPage.jsx';
import Payment from './Pages/Payment/Payment.jsx';
import ManagePendings from './AdminDashboard/DashBoardPages/ManagePendings/ManagePendings.jsx';
import ManageProducts from './AdminDashboard/DashBoardPages/ManageProducts/ManageProducts.jsx';
import Login from './Pages/Login/Login.jsx';
import UserOrderHistory from './Pages/UserOrderHistory/UserOrderHistory.jsx';
import PaymentHistory from './AdminDashboard/DashBoardPages/PaymentHistory/PaymentHistory.jsx';
import OrderHistory from './AdminDashboard/DashBoardPages/OrderHistory/OrderHistory.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      },
     
      {
        path: "/shop/:categoryName",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/shop/:categoryName",
        element: <ShopPage></ShopPage>,
      },
      {
        path: "/product/:id",
        element: <ProductDetails></ProductDetails>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/update/:id",
        element: <Update></Update>,
      },
      
      {
        path: "/extraInfo",
        element: <AddExtraInfo></AddExtraInfo>,
      },
      {
        path: "/payment",
        element: <Payment></Payment>,
      },
      {
        path: "/orderHistory",
        element: <UserOrderHistory></UserOrderHistory>,
      },
    ]
  },

  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
  children:[
    {
      path: "/dashboard/adminHome",
      element: <AdminHome></AdminHome>
    },
    {
      path: "/dashboard/manageProducts",
      element:  <ManageProducts></ManageProducts>,
    },
    {
      path: "/dashboard/manageUsers",
      element: <AllUsers></AllUsers>,
    },
    {
      path: "/dashboard/addProducts",
      element: <AddProducts></AddProducts>,
    },
    {
      path: "/dashboard/addCategories",
      element: <AddCategories></AddCategories>,
    },
    {
      path: "/dashboard/managePendings",
      element: <ManagePendings></ManagePendings>,
    },
    {
      path: "/dashboard/updateProduct/:id",
      element: <Update></Update>,
    },
    {
      path: "/dashboard/paymentHistory",
      element: <PaymentHistory></PaymentHistory>,
    },
    {
      path: "/dashboard/orderHistory",
      element: <OrderHistory></OrderHistory>,
    },
  
  ]
  }
]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>

    </Provider>

  </React.StrictMode>,
)

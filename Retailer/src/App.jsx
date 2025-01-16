// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import RetailerDashboard from "./pages/RetailerDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";
import Retailer from "./pages/Retailer";
import RetailerHome from "./pages/RetailerHome";
import Product from "./pages/Product";
import Banking from "./pages/Banking";
import Order from "./pages/Order";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element : <SignUp/>
  },
  // {
  //   path: "/retailerdashboard",
  //   element:  <ProtectedRoute> <RetailerDashboard/> </ProtectedRoute> , 
  //   children: [
  //     // {
  //     //   index: true,
  //     //   element: ,
  //     // },
  //     // {
  //     //   path: "retailer",
  //     //   element: <Retailer />,
  //     // }
  //   ],
  // },
  {
    path: "/retailer",
    element: <ProtectedRoute><Retailer /></ProtectedRoute>,
    children : [
      {
        index : true,
        element : <RetailerHome/>
      },
      {
        path: "product",
        element : <Product/>
      },
      {
        path: "banking",
        element : <Banking/>
      },
      {
        path: "order",
        element : <Order/>
      },
      
    ]
  },
  
  {
    path: "*",
    element: <NotFound/>,
  },
]);



function App() {


  return (
      <RouterProvider router={router} />
  );
}

export default App;
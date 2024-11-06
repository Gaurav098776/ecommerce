// src/App.jsx
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import LoginForm from "./pages/LoginForm";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
import RetailerDashboard from "./pages/RetailerDashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/signup",
    element : <SignUp/>
  },
  {
    path: "/retailerdashboard",
    element:  <ProtectedRoute> <RetailerDashboard/> </ProtectedRoute> , 
    children: [
      // {
      //   index: true,
      //   element: ,
      // },
      // {
      //   path: "category",
      //   element: <Category />,
      // }
    ],
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
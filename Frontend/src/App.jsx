// src/App.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth, logout } from "./store/auth-slice"; 
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { LoginForm } from "./pages/auth/LoginForm";
import { Dashboard } from "./pages/admin/Dashboard";
import { DashboardHome } from "./pages/admin/DashboardHome";
import { NotFound } from "./pages/NotFound";
import { Reatiler } from "./pages/retailer/Reatiler";
import { UserEmployee } from "./pages/userEmploye/UserEmployee";
import { Category } from "./pages/admin/Category";
import SubCategory from "./pages/admin/SubCategory";
import Role from "./pages/admin/Role";
import UserRegistration from "./pages/admin/UserRegistration";
import UserDetails from "./pages/admin/UserDetails";


const PrivateRoute = ({ children, role }) => { // Add role as a prop

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  const { isAuthenticated, role: userRole,user } = useSelector((state) => state.auth);
  console.log("isAuthenticated:", isAuthenticated);

  // Check for authentication and then for the specific role
  if (isAuthenticated && userRole) { 
    if (role && userRole !== role) { // Redirect if role doesn't match
      return <Navigate to="/unauthorized" replace />; 
    }
    return children;
  } else {
    return <Navigate to="/" replace />; 
  }


//   if (!user) {
//     return <Navigate to="/login" />;
// }
//  const employeeRoles = ['hr', 'accountant', 'developer'];

//     // Check if the user role is for employee and navigate accordingly
//     if (role === 'employee' && employeeRoles.includes(user.role_name)) {
//       return children; // Allow access to employee-related routes
//   }

//   // Role-based navigation
//   if (user.role_name !== role) {
//       return <Navigate to="/unauthorized" />;
//   }

  // return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/dashboard",
    element: <PrivateRoute role="admin"><Dashboard /></PrivateRoute>, // Protect for 'admin' role
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "subcategory",
        element: <SubCategory />,
      },
      {
        path: "role",
        element: <Role />,
      },
      {
        path: "registration",
        element: <UserRegistration />,
      },
      {
        path: "userdetails",
        element: <UserDetails />,
      },
    ],
  },
  {
    path: "/userEmployee",
    element: <PrivateRoute ><UserEmployee /></PrivateRoute>, // Protect for 'employee' role
  },
 
  {
    path: "*",
    element: <NotFound />,
  },
]);



function App() {
 
  return (
      <RouterProvider router={router} />
  );
}

export default App;
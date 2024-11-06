import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from '@/store/feature/authSlice';
// import { checkAuth } from '@/store/feature/retailerSlice';

// const ProtectedRoute = ({ children }) => {
//     const dispatch =   useDispatch;
//     const {isAuthenticated } = useSelector((state) => state.auth);

//     useEffect(()=>{
//        dispatch(checkAuth())
//     },[dispatch])

//     return isAuthenticated ? children : <Navigate to="/" />
// };




const ProtectedRoute = ({ children, role }) => { // Add role as a prop
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    const { isAuthenticated } = useSelector((state) => state.auth);
    console.log("isAuthenticated:", isAuthenticated);
    
    // Check for authentication and then for the specific role
    // if (isAuthenticated) { 
    //     if (role && userRole !== role) { // Redirect if role doesn't match
    //         return <Navigate to="/unauthorized" replace />; 
    //     }
    //     return children;
    // } else {
    //     return <Navigate to="/" replace />; 
    // }

    return isAuthenticated ? children : <Navigate to="/" />
    
}

export default ProtectedRoute;
import React, { useContext, useEffect } from 'react';
import { SharedData } from '../SharedData/SharedContext';
import { Navigate, useLocation } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const AdminRoute = ({children}) => {
    const { user, loading, logout } = useContext(SharedData);
    const location = useLocation();
    location.pathname= "/";
    useEffect(()=>{
        if(!loading && !user?.role==="admin"){
            logout();
        }
    },[loading, user])
    if(loading){
        return <Spinner></Spinner>;
    }
    if(user && user?.role==="admin"){
        return children;
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;
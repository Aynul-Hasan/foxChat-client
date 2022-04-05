import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../customHook/useAuth';
import Lottie from 'react-lottie'
import animationData from "../../animations/loding"
const PrivateRoute = ({children,...rest}) => {
    const {user,isLoading}= useAuth()
    let location =useLocation()
    const defaultOptions={
        loop:true,
        autoplay:true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }
    if(isLoading){
        return <div className="ss"><Lottie className="animations" options={defaultOptions} height={250} width={330}></Lottie> </div>
    }
    if(user?.email){
        return children
    }
    return <Navigate to="/login" state={{from: location}}/>
};

export default PrivateRoute;

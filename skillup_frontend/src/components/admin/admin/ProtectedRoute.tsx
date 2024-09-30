import React, { ReactElement } from 'react'
import { USer } from '../../../types/types'
import { Navigate, Outlet } from 'react-router-dom'


interface props {
    isAuthenticated?: boolean,
    adminRoute?: boolean,
    isAdmin?: boolean,
    user?: USer | null,
    children?: ReactElement

};


export const ProtectedRoute = ({ isAuthenticated, adminRoute, isAdmin, user, children }: props) => {

    if (user?.role !== "admin") {
        return <Navigate to={"/"} />
    };

    if (isAuthenticated && adminRoute && isAdmin && user?.role === "admin") {
        <Navigate to={"/"} />
    };

    return children ? children : <Outlet />;
}


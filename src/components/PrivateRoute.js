import React from 'react'
import { isLoggedIn } from '../services/auth-service'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute() {
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />
}

export default PrivateRoute
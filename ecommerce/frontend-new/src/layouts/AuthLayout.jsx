import React from 'react'
import { Outlet } from 'react-router'
import { Toaster } from 'sonner'

const AuthLayout = () => {
    return (
        <div>
            <Toaster position="bottom-right" />
            <Outlet />
        </div>
    )
}

export default AuthLayout
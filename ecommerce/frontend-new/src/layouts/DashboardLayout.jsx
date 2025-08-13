import React from 'react'
import { Outlet } from 'react-router'
import DashboardMenu from '../components/dashboard/DashboardMenu'

const DashboardLayout = () => {
    return (
        <div className='flex'>
            <aside className='w-64 bg-gray-100 min-h-screen'>
                <DashboardMenu />
            </aside>
            <Outlet />
        </div>
    )
}

export default DashboardLayout
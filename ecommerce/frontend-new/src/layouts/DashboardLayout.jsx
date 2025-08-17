import React from 'react'
import { Link, Outlet } from 'react-router'
import DashboardMenu from '../components/dashboard/DashboardMenu'
import { Toaster } from 'sonner'
import { Building } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'


const DashboardLayout = () => {

    const { user, logOut } = useAuth();
    return (
        <div className='flex'>

            <aside className='w-96 bg-gray-100 min-h-screen p-10 flex flex-col justify-between'>
                <div className="heading flex gap-3 items-center">
                    <div className="icon">
                        <Building />
                    </div>
                    <h3>Admin</h3>
                </div>
                <DashboardMenu />
                <div className="bottom flex gap-3 flex-col">
                    <Link to={'/'}>Homepage</Link>
                    <button className='custom_button' onClick={logOut} >Logout</button>
                </div>
            </aside>
            <main className='bg-gray-200 w-full p-5'>
                <Toaster position="bottom-right" />
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
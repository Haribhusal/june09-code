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


            <div className="leftbar">

                <aside className='w-96 bg-gray-100 h-screen sticky top-0 p-10 flex flex-col justify-between'>
                    <div className="heading flex gap-3 items-center">
                        <div className="icon size-8 bg-green-600 flex items-center justify-center rounded-md">
                            <Building className='text-white' />
                        </div>
                        <div className="info">
                            <h3 className='font-bold text-green-600'>BKLM Ecommerce</h3>
                            <div className='flex gap-2'>
                                <p>{user?.name}</p>
                                <p>({user?.role})</p>
                            </div>
                        </div>
                    </div>
                    <DashboardMenu />
                    <div className="bottom flex gap-3 flex-col">
                        <Link to={'/'}>Homepage</Link>
                        <button className='custom_button' onClick={logOut} >Logout</button>
                    </div>
                </aside>
            </div>

            <main className='bg-gray-200 w-full p-5'>
                <Toaster position="bottom-right" />
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout
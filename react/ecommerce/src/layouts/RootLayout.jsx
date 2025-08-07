import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <>
            <Header />
            <main className='min-h-[80vh]'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default RootLayout
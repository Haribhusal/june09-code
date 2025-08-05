import React from 'react'
import Header from './../components/Header'
import Footer from './../components/Footer'
import { Outlet } from 'react-router'

const RootLayout = () => {
    return (
        <div>
            <Header />
            <main className='max-w-7xl mx-auto py-5'>

                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default RootLayout
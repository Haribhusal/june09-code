import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className='max-w-7xl flex justify-between gap-3 mx-auto border-b py-5'>
            <div className="logo">
                <Link href={'/'} className='text-2xl font-bold'> Logo</Link>
            </div>
            <nav className='flex gap-3'>
                <Link href="/about-us">About Us</Link>
                <Link href="/services">Service</Link>
                <Link href="/contact">Contact</Link>
            </nav>
            <button>Login</button>
        </header>
    )
}

export default Header
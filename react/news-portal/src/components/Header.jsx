import React from 'react'
import { Link } from 'react-router'

const Header = () => {
    return (
        <header className='bg-green-700 text-white px-3 py-3'>
            <div className="max-w-7xl justify-between mx-auto flex items-center">
                <Link to="/">Logo</Link>
                <nav className='flex gap-3'>
                    <Link to="/about">About</Link>
                    <Link to="/all-news">All News</Link>
                    <Link to="/news-details">News Details</Link>
                </nav>

            </div>
        </header>
    )
}

export default Header
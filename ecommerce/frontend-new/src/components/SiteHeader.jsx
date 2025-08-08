import React from 'react'
import { Link } from 'react-router'

const SiteHeader = () => {
  return (
  <header className='border-b sticky top-0 bg-gray-50/70  backdrop-blur-sm border-gray-300 py-3'>
    <div className="container max-w-7xl mx-auto flex justify-between items-center">
      <h2 className="logo">LOGO</h2>
      <nav className='flex gap-3'>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/offers">Offers</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="action flex gap-2 items-center">
        <button>CART</button>
        <button className='outline px-3 py-2 rounded-md'>Login</button>
        <button className='custom_button'>Register</button>
      </div>
    </div>
  </header>
  )
}

export default SiteHeader
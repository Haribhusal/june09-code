import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'
import { toast } from 'sonner'
import { useAuth } from './../hooks/useAuth'


const SiteHeader = () => {


  const { user, logOut } = useAuth();
  console.log(user)
  const [token, setToken] = useState(null)
  let storedCartItems = useSelector((state) => state.cart.cartItems)




  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    setToken(storedToken)
  }, [])



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
          <Link to={'/cart'}>
            <button className='relative px-5 py-2 rounded-md'>
              CART
              <span className='absolute bg-red-500 text-white px-2 py-1 rounded-md -top-3 text-sm'>
                {storedCartItems.length}
              </span>
            </button>
          </Link>


          {token ?
            <div className='flex gap-3 items-center'>
              <div>
                welcome {user.name} ({user.role})
              </div>
              <Link to={'/dashboard'}>
                <button className='outline px-3 py-2 rounded-md'>Dashboard</button>
              </Link>
              <button onClick={logOut} className='outline px-3 py-2 rounded-md'>Logout</button>
            </div>
            :
            <div className='flex gap-3'>
              <Link to={'/auth/login'}>
                <button className='outline px-3 py-2 rounded-md'>Login</button>
              </Link>
              <Link to={'/auth/register'}>
                <button className='custom_button'>Register</button>
              </Link>
            </div>
          }
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
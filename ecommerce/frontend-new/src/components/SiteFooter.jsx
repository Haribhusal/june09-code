import React from 'react'
import products from './../data/products.json';
import { Link } from 'react-router';

const SiteFooter = () => {

  let categories = products.map((p) => p.category)
  console.log(categories)

  let uniqueCategories = [...new Set(categories)];
  console.log(uniqueCategories)

  return (
<footer className='bg-gray-900 py-10 text-white'>
  <div className="container max-w-7xl mx-auto">
    <div className="grid grid-cols-2 md:grid-cols-4">
      <div className="brand">
      <div className="title">LOGO</div>
      <div className="info mt-3">

      <p className='text-slate-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor!</p>
      </div>
      </div>
      <div className="links">
        <div className="title">Categories</div>
        <div className="links flex flex-col text-slate-500 mt-3">
          {uniqueCategories.map((link, idx) => (
            <Link key={idx} to={`/categories/${link}`} className='hover:text-white'>
              {link}
            </Link>
          ))}
        </div>
      </div>
      <div className="links">
        <div className="title">Recent Products</div>
        <div className="links flex flex-col text-slate-500 mt-3">
          {products.slice(0,6).map((p, idx) => (
            <Link key={idx} to={`/categories/${p}`} className='hover:text-white'>
              {p.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="links">
        <div className="title">Categories</div>
        <div className="links flex flex-col text-slate-500 mt-3">
          {uniqueCategories.map((link, idx) => (
            <Link key={idx} to={`/categories/${link}`} className='hover:text-white'>
              {link}
            </Link>
          ))}
        </div>
      </div>
     
    </div>
  </div>
  <div className="container mt-10 pt-5 border-t border-y-gray-700 max-w-7xl mx-auto">
    <div className="flex justify-between">
      <p>
        &copy; Business Name, All rightts reserved
      </p>
      <p>
        Powered by <a>Broadway Infosys</a>
      </p>
    </div>
  </div>
</footer>
  )
}

export default SiteFooter
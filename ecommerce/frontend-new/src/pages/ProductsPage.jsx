import React from 'react'
import products from './../data/products.json'
import { Link } from 'react-router'
import generateSlug from './../utils/generateSlug'
const ProductsPage = () => {
  console.log(products)


  return (
    <section>
      <div className="container max-w-7xl mx-auto">
        <div className="heading my-5">
        <h3 className="heading text-2xl font-bold">Products</h3>
        <p className='text-sm text-stone-500'>Find best products for you!</p>
        </div>
        <div className="product_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          
          {products.map((p, idx) => (
          <Link key={idx} to={`/product-details/${generateSlug(p.title)}`}>

          <article  className='p-3 border border-gray-200 bg-transparent hover:bg-gray-100 rounded-md'>
            <figure className=''>
              <img src={p.imagePath} className='aspect-square rounded-md object-cover' alt="" />
            </figure>
            <div className="info py-3">
              <h3 className='text-2xl font-bold'>{p.title}</h3>
              <div className="text-slate-500 text-sm bg-slate-200 inline-block px-3 py-1 rounded-sm my-2">{p.category}</div>
              <p className='text-slate-600'>{p.description}</p>

              <div className="action mt-3 flex justify-between items-start gap-3 flex-col">
                <div className="price text-xl font-bold">
                  {/* Rs. {(p.price*140).toFixed(0)} */}
                  Rs. {Math.ceil(p.price*140)}
                </div>
                <button className='custom_button'>
                  Add To Cart
                </button>
              </div>
            </div>
          </article>
          </Link>

             ))}
         
        </div>
      </div>
    </section>
  )
}

export default ProductsPage
import React from 'react'
import products from './../data/products.json'
import { Link } from 'react-router'
import generateSlug from './../utils/generateSlug'

import { useDispatch } from 'react-redux'
import { addItemToCart } from './../redux/features/cartSlice'

const ProductsPage = () => {

  const dispatch = useDispatch();

  console.log(products)

  return (
    <section>
      <div className="container max-w-7xl mx-auto">
        <div className="heading my-5">
          <h3 className="heading text-2xl font-bold">Products </h3>
          <p className='text-sm text-stone-500'>Find best products for you!</p>
        </div>
        <div className="product_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">

          {products.map((p, idx) => (


            <article key={idx} className='p-3 border border-gray-200 bg-transparent hover:bg-gray-100 rounded-md'>
              <figure className=''>
                <Link key={idx} to={`/product-details/${generateSlug(p.title)}`}>
                  <img src={p.imagePath} className='aspect-square rounded-md object-cover' alt="" />
                </Link>
              </figure>
              <div className="info py-3">
                <Link key={idx} to={`/product-details/${generateSlug(p.title)}`}>
                  <h3 className='text-2xl font-bold'>{p.title}</h3>
                </Link>
                <div className="text-slate-500 text-sm bg-slate-200 inline-block px-3 py-1 rounded-sm my-2">{p.category}</div>
                <p className='text-slate-600'>{p.description}</p>

                <div className="action mt-3 flex justify-between items-start gap-3 flex-col">
                  <div className="price text-xl font-bold">
                    {/* Rs. {(p.price*140).toFixed(0)} */}
                    Rs. {Math.ceil(p.price * 140)}
                  </div>
                  <button onClick={() => dispatch(addItemToCart(p))} className='custom_button'>
                    Add To Cart
                  </button>
                </div>
              </div>
            </article>

          ))}

        </div>
      </div>
    </section >
  )
}

export default ProductsPage
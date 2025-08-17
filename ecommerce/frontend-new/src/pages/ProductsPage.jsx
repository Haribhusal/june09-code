import React, { useState, useEffect } from 'react'
import ProductCard from './../components/ProductCard'

const ProductsPage = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        let res = await fetch('http://localhost:5555/api/products');
        let data = await res.json();
        setProducts(data.products)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    }
    fetchProducts();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <section className='py-10'>
      <div className="container max-w-7xl mx-auto">
        <div className="heading my-5">
          <h3 className="heading text-2xl font-bold">Products </h3>
          <p className='text-sm text-stone-500'>Find best products for you!</p>
        </div>
        <div className="product_grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {products.map((product, idx) => (
            <ProductCard key={idx} p={product} />
          ))}
        </div>
      </div>
    </section >
  )
}

export default ProductsPage
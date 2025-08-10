import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import products from './../data/products.json'
import generateSlug from '../utils/generateSlug'




const ProductDetailPage = () => {
  const [productData, setProductData] = useState({});

  const { slug } = useParams();
  console.log(slug)

  useEffect(() => {
    let product = products.filter((p) => generateSlug(p.title) == slug)
    setProductData(product[0])


  }, [slug])


  return (

    <section className='py-10'>
      <div className="container max-w-7xl mx-auto">
        <div className="flex gap-5">
          <div className="image w-full md:w-1/3">
            <figure>
              <img src={productData.imagePath} className='aspect-square object-cover' alt="" />
            </figure>
          </div>

          <div className="heading my-5">
            <h3 className="heading text-2xl font-bold">{productData.title}</h3>
            <p className=''>{productData.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import products from './../data/products.json'
import generateSlug from '../utils/generateSlug'
import formatPrice from '../utils/formatPrice'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../redux/features/cartSlice'

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const randomId = () => {
    return (Math.random() * 10).toFixed(0)
  }
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState({});

  console.log(productData)
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        let res = await fetch(`http://localhost:5555/api/products/${id}`);
        let data = await res.json();

        console.log(data)

        if (data?.product) {
          setProductData(data.product);
          // Populate form fields
        }
        setProductData(data.product)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

    }
    fetchProduct();
  }, [id])


  return (

    <section className='py-10'>
      <div className="container max-w-7xl mx-auto">
        <div className="flex gap-5">
          <div className="image w-full md:w-1/3">
            <figure>
              <img src={`https://picsum.photos/id/${randomId()}/400/400`} className='aspect-square size-96 rounded-md object-cover' alt="" />
            </figure>
          </div>

          <div className="heading my-5 space-y-5">
            <h3 className="heading text-2xl font-bold">{productData.name}</h3>
            <p className=''>{productData.description}</p>
            <p className='text-2xl'>{formatPrice(productData.price)}</p>
            <p className='border px-3 py-3 rounded-md'>{productData.stock} in Stock</p>

            <div className="actions">
              <button className='custom_button' onClick={() => dispatch(addItemToCart(productData))}>Add this product to cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import formatPrice from '../utils/formatPrice'
import { useDispatch } from 'react-redux'
import { addItemToCart } from '../redux/features/cartSlice'
import { BACKEND_URL } from './../config/config'

const ProductDetailPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        let res = await fetch(`${BACKEND_URL}/api/products/${id}`);
        let data = await res.json();

        if (data?.product) {
          setProductData(data.product);
          // Set the first image as selected by default
          if (data.product.images && data.product.images.length > 0) {
            setSelectedImage(data.product.images[0]);
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct();
  }, [id])

  const getProductImage = (image) => {
    if (image && image.filename) {
      return `${BACKEND_URL}/uploads/products/${image.filename}`;
    }
    return 'https://via.placeholder.com/400x400?text=No+Image';
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(productData));
  };

  if (loading) {
    return (
      <section className='py-10'>
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </section>
    );
  }

  if (!productData._id) {
    return (
      <section className='py-10'>
        <div className="container max-w-7xl mx-auto">
          <div className="text-center">Product not found</div>
        </div>
      </section>
    );
  }

  return (
    <section className='py-10'>
      <div className="container max-w-7xl mx-auto">
        <div className="flex gap-5 flex-col lg:flex-row">
          {/* Image Gallery */}
          <div className="image w-full lg:w-1/2">
            <div className="space-y-4">
              {/* Main Image */}
              <figure className="border rounded-lg overflow-hidden">
                <img
                  src={selectedImage ? getProductImage(selectedImage) : getProductImage()}
                  className='aspect-square w-full h-96 rounded-md object-cover'
                  alt={productData.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x400?text=Image+Error';
                  }}
                />
              </figure>

              {/* Thumbnail Gallery */}
              {productData.images && productData.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {productData.images.map((image, index) => (
                    <button
                      key={image.filename}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 border-2 rounded-md overflow-hidden ${selectedImage && selectedImage.filename === image.filename
                        ? 'border-blue-500'
                        : 'border-gray-200'
                        }`}
                    >
                      <img
                        src={getProductImage(image)}
                        className='w-20 h-20 object-cover'
                        alt={`${productData.name} - Image ${index + 1}`}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=Error';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Indicator */}
              {productData.mainImage && (
                <div className="text-sm text-gray-600">
                  {productData.images && productData.images.find(img => img.filename === productData.mainImage) && (
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                      Main Image
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="heading my-5 space-y-5 w-full lg:w-1/2">
            <h3 className="heading text-3xl font-bold">{productData.name}</h3>
            <p className='text-gray-600 leading-relaxed'>{productData.description}</p>

            <div className="price-section">
              <p className='text-3xl font-bold text-blue-600'>{formatPrice(productData.price)}</p>
            </div>

            <div className="stock-section">
              <p className={`px-3 py-2 rounded-md inline-block ${productData.stock > 0
                ? 'bg-green-100 text-green-800 border border-green-200'
                : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                {productData.stock > 0 ? `${productData.stock} in Stock` : 'Out of Stock'}
              </p>
            </div>

            <div className="category-section">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-md text-sm">
                {productData.category}
              </span>
            </div>

            <div className="actions">
              <button
                className='custom_button disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleAddToCart}
                disabled={productData.stock <= 0}
              >
                {productData.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
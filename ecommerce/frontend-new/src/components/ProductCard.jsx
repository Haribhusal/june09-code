import React, { useState } from 'react'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { addItemToCart } from './../redux/features/cartSlice'
import { toast } from 'sonner'
import { BACKEND_URL } from './../config/config'

const ProductCard = ({ p }) => {
    const dispatch = useDispatch();
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);



    const handleImageLoad = () => {
        setImageLoading(false);
        setImageError(false);
    };

    const handleImageError = () => {
        setImageLoading(false);
        setImageError(true);
    };

    const handleAddToCart = () => {
        dispatch(addItemToCart(p));
        toast.success(`${p.name} has been added to the cart`);
    };

    // Skeleton loading component
    const ImageSkeleton = () => (
        <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md">
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-md"></div>
        </div>
    );

    // Error state component
    const ImageError = () => (
        <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center">
            <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm">Image not available</div>
            </div>
        </div>
    );

    return (
        <article className='p-3 border border-gray-200 bg-transparent hover:bg-gray-100 rounded-md'>
            <figure className=''>
                <Link to={`/product-details/${p._id}`}>
                    {/* Show skeleton while loading */}
                    {imageLoading && <ImageSkeleton />}

                    {/* Show image when loaded */}
                    {!imageError && (
                        <img
                            // src={getProductImage()}
                            className={`aspect-square rounded-md object-cover w-full h-64 transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                                }`}
                            alt={p.name}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            style={{ display: imageLoading ? 'none' : 'block' }}
                        />
                    )}

                    {/* Show error state if image failed to load */}
                    {imageError && <ImageError />}
                </Link>
            </figure>
            <div className="info py-3">
                <Link to={`/product-details/${p._id}`}>
                    <h3 className='text-2xl font-bold'>{p.name}</h3>
                </Link>
                <div className="text-slate-500 text-sm bg-slate-200 inline-block px-3 py-1 rounded-sm my-2">{p.category}</div>
                <p className='text-slate-600 line-clamp-2'>{p.description}</p>

                <div className="action mt-3 flex justify-between items-start gap-3 flex-col">
                    <div className="price text-xl font-bold">
                        {p.discount > 0 ?
                            <div className='flex gap-3 flex-col'>
                                <div className='flex gap-2'>
                                    <span className='line-through text-red-500 decoration-red-600'>
                                        Rs. {Math.ceil(p.price)}
                                    </span>
                                    <span>
                                        ({p.discount}% off)
                                    </span>
                                </div>


                                <span className='text-green-600'>
                                    Rs. {Math.ceil(p.price - p.price * p.discount / 100)}
                                </span>
                            </div>
                            :
                            <span className='text-green-600'>

                                Rs. {Math.ceil(p.price)}
                            </span>
                        }
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className='custom_button'
                    >
                        Add To Cart
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard
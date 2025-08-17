import React from 'react'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { addItemToCart } from './../redux/features/cartSlice'
import { toast } from 'sonner'
const ProductCard = ({ p }) => {
    const dispatch = useDispatch();
    // cons÷t randomId = (Math.random() * 10).toFixed(0)
    const randomId = () => {
        return (Math.random() * 10).toFixed(0)
    }
    console.log(randomId)
    return (
        <article className='p-3 border border-gray-200 bg-transparent hover:bg-gray-100 rounded-md'>
            <figure className=''>
                <Link to={`/product-details/${p._id}`}>
                    <img src={`https://picsum.photos/id/${randomId()}/400/400`} className='aspect-square rounded-md object-cover' alt="" />
                </Link>
            </figure>
            <div className="info py-3">
                <Link to={`/product-details/${p._id}`}>
                    <h3 className='text-2xl font-bold'>{p.name}</h3>
                </Link>
                <div className="text-slate-500 text-sm bg-slate-200 inline-block px-3 py-1 rounded-sm my-2">{p.category}</div>
                <p className='text-slate-600'>{p.description}</p>

                <div className="action mt-3 flex justify-between items-start gap-3 flex-col">
                    <div className="price text-xl font-bold">
                        {/* Rs. {(p.price*140).toFixed(0)} */}
                        Rs. {Math.ceil(p.price)}
                    </div>
                    <button onClick={() => {

                        dispatch(addItemToCart(p))
                        toast.success(`${p.title} has been added to the cart`)
                    }
                    } className='custom_button'>
                        Add To Cart
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard
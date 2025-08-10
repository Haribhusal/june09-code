import { Minus, Plus } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatPrice from './../utils/formatPrice'
import { incrementQuantity } from '../redux/features/cartSlice'




const CartPage = () => {
    const dispatch = useDispatch();

    let storedCartItems = useSelector(state => state.cart.cartItems);
    return (
        <section className='py-10'>
            <div className="container max-w-7xl mx-auto">
                <h3 className="heading text-3xl mb-5">Cart</h3>
                <div className="cartItems flex flex-col gap-5">

                    {storedCartItems.length > 0 ?

                        storedCartItems.map((item, idx) => (
                            <div className="item flex gap-5" key={idx}>
                                <div className="image">
                                    <img className='size-48 rounded-md' src={item.imagePath} alt="" />
                                </div>
                                <div className="info">
                                    <h3 className="p_name text-2xl font-bold">{item.title}</h3>
                                    <div className="meta my-5">
                                        <div className="info_item">Price: {formatPrice(item.price * 140)} * {item.quantity} = {formatPrice(item.price * item.quantity * 140)}</div>
                                    </div>

                                    <div className="buttons flex gap-3">
                                        <button onClick={() => dispatch(incrementQuantity(item))} className='custom_button'>
                                            <Plus />
                                        </button>
                                        <button className='custom_button'>
                                            <Minus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                        :
                        <div>
                            <h3>No items in the cart</h3>
                        </div>
                    }


                </div>
            </div>
        </section>
    )
}

export default CartPage
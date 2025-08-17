import { ArrowRight, Car, Minus, Plus, Trash } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from './../utils/formatPrice';
import { incrementQuantity, decrementQuantity, deleteItem } from '../redux/features/cartSlice';
import { toast } from 'sonner';
import KhaltiCheckout from 'khalti-checkout-web';
import { Link } from 'react-router';

const CartPage = () => {

    const randomId = () => {
        return (Math.random() * 10).toFixed(0)
    }

    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');

    let discountPercentage = 15;
    let storedCartItems = useSelector(state => state.cart.cartItems);

    let totalAmount = storedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    let finalAmountAfterDiscount = (totalAmount) - (totalAmount * discountPercentage / 100);



    return (
        <section className='py-10'>
            <div className="container max-w-7xl mx-auto">
                <h3 className="heading text-3xl mb-5">Cart</h3>

                <div className="wrapper flex justify-between gap-10">
                    <div className="cartItems w-full sm:w-3/4 flex flex-col gap-5">
                        {storedCartItems.length > 0 ? (
                            storedCartItems.map((item, idx) => (
                                <div className="item flex gap-5" key={idx}>
                                    <div className="image">
                                        <img src={`https://picsum.photos/id/${randomId()}/400/400`} className='aspect-square size-32 rounded-md object-cover' alt="" />
                                    </div>
                                    <div className="info">
                                        <h3 className="p_name text-2xl font-bold">{item.name}</h3>
                                        <div className="meta my-5">
                                            <div className="info_item">
                                                Price: {formatPrice(item.price)} * {item.quantity} = {formatPrice(item.price * item.quantity)}
                                            </div>
                                        </div>
                                        <div className="buttons flex gap-3">
                                            <button
                                                onClick={() => {
                                                    dispatch(incrementQuantity(item));
                                                    toast.success("Item's quantity has been increased");
                                                }}
                                                className='custom_button'
                                            >
                                                <Plus />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    dispatch(decrementQuantity(item));
                                                    toast.success("Item's quantity has been decreased");
                                                }}
                                                className='custom_button'
                                            >
                                                <Minus />
                                            </button>
                                            <button
                                                onClick={() => {
                                                    dispatch(deleteItem(item));
                                                    toast.success(`${item.title} is deleted from cart`);
                                                }}
                                                className='custom_button bg-red-600'
                                            >
                                                <Trash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>
                                <h3>No items in the cart</h3>
                            </div>
                        )}
                    </div>

                    {storedCartItems.length > 0 &&

                        <div className="cart_totals w-full sm:w-1/4 bg-gray-100 border border-gray-300 p-5 rounded-md">
                            <h3 className="text-2xl font-bold">Cart Totals</h3>
                            <table className='w-full'>
                                <tbody>
                                    <tr>
                                        <td className='py-2'>Cart Totals</td>
                                        <td className='py-2'>{formatPrice(totalAmount)}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Discount</td>
                                        <td className='py-2'>{discountPercentage}%</td>
                                    </tr>
                                    <tr>
                                        <td className='py-2'>Today's total</td>
                                        <td className='py-2'>{formatPrice(finalAmountAfterDiscount)}</td>
                                    </tr>
                                </tbody>
                            </table>


                            <Link to={'/checkout'}>
                                <button className='custom_button w-full justify-center my-5 flex gap-2 items-center'>Checkout

                                    <ArrowRight />

                                </button>
                            </Link>
                        </div>
                    }

                </div>
            </div>
        </section>
    );
};

export default CartPage;
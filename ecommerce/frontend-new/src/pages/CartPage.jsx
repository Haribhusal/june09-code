import { Car, Minus, Plus, Trash } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from './../utils/formatPrice';
import { incrementQuantity, decrementQuantity, deleteItem } from '../redux/features/cartSlice';
import { toast } from 'sonner';
import KhaltiCheckout from 'khalti-checkout-web';

const CartPage = () => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');

    let discountPercentage = 15;
    let storedCartItems = useSelector(state => state.cart.cartItems);

    let totalAmount = storedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    let finalAmountAfterDiscount = (totalAmount * 140) - (totalAmount * 140 * discountPercentage / 100);

    // Initialize Khalti Checkout
    const khaltiCheckout = useMemo(() => {
        try {
            return new KhaltiCheckout({
                publicKey: 'test_public_key_dc74e0fd57cb46cd93832d7ca66a88a0', // Test public key
                productIdentity: `cart_${Date.now()}`,
                productName: 'Cart Purchase',
                productUrl: window.location.href,
                amount: Math.round(finalAmountAfterDiscount * 100), // Convert NPR to paisa
                eventHandler: {
                    onSuccess(payload) {
                        toast.success('Payment successful!');
                        console.log('Payment Success:', payload);

                        // Optionally clear cart or redirect
                        // dispatch(clearCart());
                    },
                    onError(error) {
                        toast.error(`Payment failed: ${error.message}`);
                        console.error('Payment Error:', error);
                    },
                    onClose() {
                        console.log('Khalti widget closed');
                    }
                },
                paymentPreference: ['KHALTI'], // Restrict to Khalti payment
            });
        } catch (error) {
            toast.error('Failed to initialize Khalti Checkout');
            console.error('Khalti Initialization Error:', error);
            return null;
        }
    }, [finalAmountAfterDiscount]);

    const handleKhaltiPayment = () => {
        if (!khaltiCheckout) {
            toast.error('Khalti Checkout is not initialized. Please try again.');
            return;
        }

        khaltiCheckout.show({ amount: Math.round(finalAmountAfterDiscount * 100) });
    };

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
                                        <img className='size-48 rounded-md' src={item.imagePath} alt={item.title} />
                                    </div>
                                    <div className="info">
                                        <h3 className="p_name text-2xl font-bold">{item.title}</h3>
                                        <div className="meta my-5">
                                            <div className="info_item">
                                                Price: {formatPrice(item.price * 140)} * {item.quantity} = {formatPrice(item.price * item.quantity * 140)}
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
                                        <td className='py-2'>{formatPrice(totalAmount * 140)}</td>
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

                            <div className='bg-white py-3 px-5 my-3 rounded-md shadow'>
                                <select
                                    value={paymentMethod}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className='py-3 px-5 w-full'
                                >
                                    <option value="" disabled>Select Payment Method</option>
                                    <option value="cod">Cash on Delivery</option>
                                    <option value="esewa">Esewa</option>
                                    <option value="khalti">Khalti</option>
                                    <option value="bank_transfer">Bank Transfer</option>
                                </select>
                            </div>

                            {paymentMethod === 'khalti' ? (
                                <button
                                    onClick={handleKhaltiPayment}
                                    disabled={!khaltiCheckout}
                                    className='custom_button w-full bg-purple-600 text-white disabled:opacity-50'
                                >
                                    Pay with Khalti {formatPrice(finalAmountAfterDiscount)}
                                </button>
                            ) : (
                                <button
                                    disabled={!paymentMethod}
                                    className='custom_button w-full disabled:opacity-50'
                                >
                                    Proceed Payment {formatPrice(finalAmountAfterDiscount)}
                                </button>
                            )}
                        </div>
                    }

                </div>
            </div>
        </section>
    );
};

export default CartPage;
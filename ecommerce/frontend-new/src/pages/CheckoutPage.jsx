import { ArrowLeft, ArrowRight, Car, Minus, Plus, Trash } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatPrice from './../utils/formatPrice';
import { incrementQuantity, decrementQuantity, deleteItem } from '../redux/features/cartSlice';
import { toast } from 'sonner';
import KhaltiCheckout from 'khalti-checkout-web';
import { Link } from 'react-router';
import { useForm, useFieldArray } from "react-hook-form"
import { BACKEND_URL } from './../config/config'

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useNavigate } from 'react-router';

// ✅ Yup Schema for Order
const orderSchema = yup.object({


    shippingAddress: yup.object({
        street: yup.string().min(5).max(200).required("Street is required"),
        city: yup.string().min(2).max(50).required("City is required"),
        state: yup.string().min(2).max(50).required("State is required"),
        zipCode: yup.string().min(3).max(10).required("ZIP Code is required"),
        country: yup.string().min(2).max(50).required("Country is required"),
    }),

    notes: yup.string().max(500, "Notes must be less than 500 characters").optional(),
});




const CheckoutPage = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);


    const randomId = () => {
        return (Math.random() * 10).toFixed(0)
    }

    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('');

    let discountPercentage = 15;
    let storedCartItems = useSelector(state => state.cart.cartItems);

    let totalAmount = storedCartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    let finalAmountAfterDiscount = (totalAmount) - (totalAmount * discountPercentage / 100);



    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(orderSchema),
        defaultValues: {
            items: [{ productId: "", quantity: 1 }],
            shippingAddress: { street: "", city: "", state: "", zipCode: "", country: "" },
            notes: "",
        },
    });



    const onSubmit = async (data) => {


        if (storedCartItems.length === 0) {
            toast.error("Cart is empty");
            return;
        }

        const orderPayload = {
            items: storedCartItems.map((item) => ({
                productId: item._id || item.id, // adjust based on your cart structure
                quantity: item.quantity,
            })),
            shippingAddress: data.shippingAddress,
            notes: data.notes,
        };
        const token = localStorage.getItem("token");

        try {
            setLoading(true);
            let res = await fetch(`${BACKEND_URL}/api/orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(orderPayload),
            });

            let responseData = await res.json();
            console.log(responseData)

            if (responseData.success) {
                toast.success("Order placed successfully!");
                navigate("/dashboard/my-orders");
                reset();
            } else {
                toast.error(responseData.message || "Order failed");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        } finally {
            setLoading(false);
        }
    };



    return (
        <section className='py-10'>
            <div className="container max-w-7xl mx-auto">
                <Link to={'/cart'}>
                    <button className='custom_button flex gap-2 items-center'>

                        <ArrowLeft /> Back to Cart</button>
                </Link>
                <h3 className="heading text-3xl my-5">Checkout Page</h3>

                <div className="wrapper flex justify-between gap-10">
                    <div className="cartItems w-full sm:w-3/4 flex flex-col gap-5">

                        <div className="">
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
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <h3>No items in the cart</h3>
                                </div>
                            )}
                        </div>

                        <div className="shippingAddress">
                            {/* street,city, state, zipCode, country */}


                            <form className="space-y-5">
                                {/* Shipping Address */}
                                <h4 className="text-xl font-semibold">Shipping Address</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="form-group">
                                        <label>Street*</label>
                                        <input className="custom_input" {...register("shippingAddress.street")} />
                                        {errors.shippingAddress?.street && (
                                            <p className="custom_error">{errors.shippingAddress.street.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>City*</label>
                                        <input className="custom_input" {...register("shippingAddress.city")} />
                                        {errors.shippingAddress?.city && (
                                            <p className="custom_error">{errors.shippingAddress.city.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>State*</label>
                                        <input className="custom_input" {...register("shippingAddress.state")} />
                                        {errors.shippingAddress?.state && (
                                            <p className="custom_error">{errors.shippingAddress.state.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>ZIP Code*</label>
                                        <input className="custom_input" {...register("shippingAddress.zipCode")} />
                                        {errors.shippingAddress?.zipCode && (
                                            <p className="custom_error">{errors.shippingAddress.zipCode.message}</p>
                                        )}
                                    </div>

                                    <div className="form-group">
                                        <label>Country*</label>
                                        <input className="custom_input" {...register("shippingAddress.country")} />
                                        {errors.shippingAddress?.country && (
                                            <p className="custom_error">{errors.shippingAddress.country.message}</p>
                                        )}
                                    </div>


                                </div>

                                {/* Notes */}
                                <div className="form-group">
                                    <label>Notes (optional)</label>
                                    <textarea
                                        className="custom_input"
                                        rows={3}
                                        placeholder="Additional instructions"
                                        {...register("notes")}
                                    />
                                    {errors.notes && <p className="custom_error">{errors.notes.message}</p>}
                                </div>
                                {/* 
                                <button className="custom_button w-full" type="submit">
                                    {loading ? "Submitting..." : "Place Order"}
                                </button> */}
                            </form>


                        </div>

                    </div>

                    <div className="right cart_totals w-full sm:w-1/4 bg-gray-100 border border-gray-300 p-5 rounded-md">
                        {storedCartItems.length > 0 &&
                            <div className="">
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
                                <button onClick={handleSubmit(onSubmit)} className='custom_button w-full justify-center my-5 flex gap-2 items-center'>

                                    {loading ? "Order Processing..." : "Place Order"}
                                    <ArrowRight />
                                </button>
                            </div>

                        }

                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
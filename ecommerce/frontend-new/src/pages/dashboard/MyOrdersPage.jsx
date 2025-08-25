import React, { useState, useEffect } from 'react'
import formatPrice from '../../utils/formatPrice';
import { formatDistanceToNow, format } from 'date-fns'
import { BACKEND_URL } from './../../config/config'

const MyOrdersPage = () => {

    const [loading, setLoading] = useState(false);
    const [myOrders, setMyOrders] = useState([])

    const getMyOrders = async () => {
        let token = localStorage.getItem('token')
        try {
            let res = await fetch(`${BACKEND_URL}/api/orders/my-orders`, {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            let data = await res.json();
            console.log(data)
            if (data.success) {
                setMyOrders(data.orders)
            }


        } catch (error) {

        }
    }

    useEffect(() => {
        getMyOrders();
    }, [])
    return (
        <div>
            <div className="heading">
                <h3 className='text-2xl font-bold m-5'>My Orders</h3>
            </div>
            <div className="order-list space-y-3">

                {myOrders.length > 0 ? myOrders.map((o) => (
                    <div key={o._id} className="order p-3 hover:border border border-transparent hover:border-gray-800 bg-white rounded-md shadow">

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="info">
                                <div className="subheading">Order Items</div>
                                <div className="items grid grid-cols-1 sm:grid-cols-2 gap-1">
                                    {o.items.map((item, index) => (
                                        <div key={index} className='bg-gray-100 p-3 rounded-md'>
                                            <h3>
                                                {item?.product?.name}
                                            </h3>
                                            <p>
                                                {item.quantity} * {item.price} = {formatPrice(item.quantity * item.price)}
                                            </p>

                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="info_user">
                                <div className="subheading mt-3">Shipping Address for order</div>
                                <div className='bg-gray-100 p-3 rounded-md'>
                                    <p>
                                        <strong>Street:</strong> {o.shippingAddress.street}, <strong>City:</strong> {o.shippingAddress.city}, <strong>State:</strong> {o.shippingAddress.state}, <strong>Zip:</strong> {o.shippingAddress.zipCode}, <strong>Country:</strong> {o.shippingAddress.country}
                                    </p>
                                </div>


                            </div>
                            <div className="info_summary">
                                <div className="subheading">Order Summary</div>
                                <div className='bg-gray-100 p-3 rounded-md'>
                                    <p>
                                        <strong> Total Amount:</strong> {o.totalAmount}
                                    </p>
                                    <p>
                                        <strong>Status:</strong> {o.status}
                                    </p>
                                    <p>
                                        <strong>  Notes:</strong> {o.notes}
                                    </p>

                                    <p>
                                        <strong> Order Created at :</strong> {formatDistanceToNow(o.createdAt)}, {format(o.createdAt, "HH:mm:ss")}
                                    </p>
                                    <p>
                                        <strong> Order Updated at :</strong> {formatDistanceToNow(o.updatedAt)}, {format(o.updatedAt, "HH:mm:ss")}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
                    :
                    <div>
                        <h3>No orders found</h3>
                    </div>
                }
            </div>
        </div >
    )
}

export default MyOrdersPage
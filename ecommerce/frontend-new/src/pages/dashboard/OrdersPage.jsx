import React, { useState, useEffect } from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import formatPrice from './../../utils/formatPrice';
import { toast } from 'sonner'
const OrdersPage = () => {

    const [orders, setOrders] = useState([])

    const [loading, setLoading] = useState(false)

    const [actionLoading, setActionLoading] = useState({});



    const getToken = () => localStorage.getItem("token");



    async function fetchOrders() {
        const token = localStorage.getItem('token')

        try {
            setLoading(true)
            let res = await fetch('http://localhost:5555/api/orders', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
            });
            let data = await res.json();

            if (data.success) {
                setOrders(data.orders)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }




    async function handleUpdateStatus(id, status) {

        setActionLoading((prev) => ({ ...prev, [id]: status }));

        try {
            let res = await fetch(`http://localhost:5555/api/orders/${id}/status`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify({ 'status': status })

            })

            let data = await res.json();

            if (data.success) {
                toast.success(data.message || "Order status updated")

                // ✅ update local state instead of refetching
                setOrders(prev =>
                    prev.map(order =>
                        order._id === id ? { ...order, status, updatedAt: new Date() } : order
                    )
                );
            }
            console.log(data)
        } catch (error) {

            console.log(error)

        } finally {
            setLoading(false)
        }

    }


    // Delete order
    const handleDeleteOrder = async (id) => {
        setActionLoading((prev) => ({ ...prev, [id]: "deleting" }));
        try {
            const res = await fetch(`http://localhost:5555/api/orders/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            });

            const data = await res.json();
            if (data.success) {
                toast.success("Order deleted");
                setOrders((prev) => prev.filter((o) => o._id !== id));
            } else {
                toast.error(data.message || "Delete failed");
            }
        } catch (error) {
            toast.error("Error deleting order");
            console.error(error);
        } finally {
            setActionLoading((prev) => ({ ...prev, [id]: null }));
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [])

    return (
        <div>
            <div className="heading">
                <h3 className='text-2xl font-bold m-5'>Orders</h3>
            </div>
            <div className="order-list space-y-3">
                {loading && <div>
                    Loading...</div>
                }

                {orders.length > 0 ? orders.map((o) => (
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
                                <div className="subheading">Order By</div>
                                <div className='bg-gray-100 p-3 rounded-md'>
                                    <h3>
                                        {o.user.name}
                                    </h3>
                                    <p>
                                        {o.user.email}
                                    </p>
                                </div>
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


                                <div className="actions flex gap-3 mt-3 flex-wrap">
                                    {o.status === "pending" && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    handleUpdateStatus(o._id, "processing")
                                                }
                                                className="custom_button bg-green-600"
                                            >
                                                {actionLoading[o._id] === "processing"
                                                    ? "Accepting..."
                                                    : "Accept"}
                                            </button>
                                            <button
                                                onClick={() => handleUpdateStatus(o._id, "cancelled")}
                                                className="custom_button bg-red-600"
                                            >
                                                {actionLoading[o._id] === "cancelled"
                                                    ? "Declining..."
                                                    : "Decline"}
                                            </button>
                                        </>
                                    )}

                                    {o.status === "processing" && (
                                        <button
                                            onClick={() => handleUpdateStatus(o._id, "shipped")}
                                            className="custom_button bg-blue-600"
                                        >
                                            {actionLoading[o._id] === "shipped"
                                                ? "Shipping..."
                                                : "Ship Now"}
                                        </button>
                                    )}

                                    {o.status === "shipped" && (
                                        <button
                                            onClick={() => handleUpdateStatus(o._id, "delivered")}
                                            className="custom_button bg-yellow-600"
                                        >
                                            {actionLoading[o._id] === "delivered"
                                                ? "Delivering..."
                                                : "Deliver"}
                                        </button>
                                    )}

                                    {o.status === "delivered" && (
                                        <button
                                            onClick={() => handleDeleteOrder(o._id)}
                                            className="custom_button bg-red-600"
                                        >
                                            {actionLoading[o._id] === "deleting"
                                                ? "Deleting..."
                                                : "Delete Order"}
                                        </button>
                                    )}
                                </div>

                                {/* <div className="actions flex gap-1 mt-3">

                                    {o.status === "pending" &&
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleUpdateStatus(o._id, "processing")} className='custom_button bg-green-600'>
                                                {actionLoading ? "Accepting..." : "Accept Order"}
                                            </button>

                                            <button className='custom_button bg-red-600' onClick={() => handleUpdateStatus(o._id, 'cancelled')}>
                                                {actionLoading ? "Declining..." : "Decline Order"}
                                            </button>
                                        </div>
                                    }

                                    {o.status === "processing" &&
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleUpdateStatus(o._id, "shipped")} className='custom_button bg-blue-600'>
                                                {actionLoading ? "Shipping..." : "Ship Now"}

                                            </button>
                                        </div>
                                    }

                                    {o.status === "shipped" &&
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleUpdateStatus(o._id, 'delivered')} className='custom_button bg-yellow-600'>
                                                {actionLoading ? "Delivering..." : "Deliverd"}

                                            </button>
                                        </div>
                                    }
                                    {o.status === "delivered" &&
                                        <div className='flex gap-3'>
                                            <button onClick={() => handleDeleteOrder(o._id)} className='custom_button bg-red-600'>
                                                {actionLoading ? "Deleting..." : "Delete Order"}
                                            </button>
                                        </div>
                                    }
                                </div> */}
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

export default OrdersPage
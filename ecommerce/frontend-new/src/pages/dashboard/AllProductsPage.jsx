import { Pencil, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'


const AllProductsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [deleteId, setDeleteId] = useState(undefined)

    const fetchProducts = async () => {
        try {
            setLoading(true)
            let res = await fetch('http://localhost:5555/api/products');
            let data = await res.json();
            setProducts(data.products)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchProducts();
    }, [])

    const handleDelete = (id) => {
        // console.log(id)
        setShowPopUp(true)
        setDeleteId(id)
    }
    const handleActualDelete = async (id) => {

        const token = localStorage.getItem("token"); // or your token key

        try {
            setLoading(true)
            let res = await fetch(`http://localhost:5555/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            let responseData = await res.json();
            console.log(responseData)

            if (responseData.success) {
                setShowPopUp(false)
                toast.success(responseData.message)
                navigate('/dashboard/all-products')
                setProducts(products.filter(p => p._id !== id)) // remove from UI without reload

            }
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }
    return (
        <div>

            {showPopUp &&
                <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-950/20'>
                    <div className="alertBox bg-gray-50 max-w-md w-full p-5 rounded-md">
                        <h3 className='text-2xl font-bold mb-3'>Do you want to delete this product?</h3>
                        <p>If yes, proceed. This is not reversible. If you accidently clicked delete, you can cancel the operation</p>
                        <div className="actions flex justify-end gap-4 my-5">
                            <button onClick={() => setShowPopUp(false)} className='custom_button bg-gray-100 text-gray-900'>Cancel</button>
                            <button onClick={() => handleActualDelete(deleteId)} className='custom_button'>Proceed</button>
                        </div>
                    </div>

                </div>
            }

            <div className="heading flex justify-between ">
                <h3 className="text-3xl font-bold mb-5">All Products</h3>

                <Link to={'/dashboard/add-product'}>
                    <button className='custom_button'>Add Product</button>
                </Link>
            </div>
            {products.length > 0 ?

                <table className='table w-full border'>

                    <thead className='text-left'>
                        <tr>
                            <th className='border py-3 px-5'>
                                Name
                            </th>
                            <th className='border py-3 px-5'>
                                Price
                            </th>
                            <th className='border py-3 px-5'>
                                Stock
                            </th>
                            <th className='border py-3 px-5'>
                                Category
                            </th>
                            <th className='border py-3 px-5'>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, index) => (
                            <tr key={index} className='border py-3 px-5'>
                                <td className='border py-3 px-5'>
                                    {p.name}
                                </td>
                                <td className='border py-3 px-5'>
                                    {p.price}
                                </td>
                                <td className='border py-3 px-5'>
                                    {p.stock}
                                </td>
                                <td className='border py-3 px-5'>
                                    {p.category}
                                </td>
                                <td className='border py-3 px-5'>
                                    <div className="actions flex gap-3">
                                        <Link to={`/dashboard/edit-product/${p._id}`}>
                                            <button className='bg-green-700 text-white px-3 py-3 text-sm rounded'>
                                                <Pencil size={16} />
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(p._id)} className='bg-red-500 text-white px-3 py-3 text-sm rounded'>
                                            <Trash size={16} />
                                        </button>
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>


                :
                <div>
                    <h3>Products not found</h3>
                </div>
            }
        </div>
    )
}

export default AllProductsPage
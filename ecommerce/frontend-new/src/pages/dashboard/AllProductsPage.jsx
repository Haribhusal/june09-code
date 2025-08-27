import { Pencil, Trash, Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { toast } from 'sonner'
import DashboardProductCard from '../../components/DashboardProductCard'
import { BACKEND_URL } from './../../config/config'

const AllProductsPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [deleteId, setDeleteId] = useState(undefined)

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;

    const goToPage = (page) => {
        setSearchParams({ page: page.toString() })
    }

    // Pagination states
    const [page, setPage] = useState(1)
    const [pagination, setPagination] = useState({})

    const fetchProducts = async (pageNo = 1) => {
        try {
            setLoading(true)
            let res = await fetch(`${BACKEND_URL}/api/products?page=${pageNo}`);
            let data = await res.json();
            setProducts(data.products)
            setPagination(data.pagination)

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage])

    const handleDelete = (id) => {
        setShowPopUp(true)
        setDeleteId(id)
    }

    const handleActualDelete = async (id) => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true)
            let res = await fetch(`${BACKEND_URL}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })
            let responseData = await res.json();

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
        return (
            <div className="container max-w-7xl mx-auto py-10">
                {/* Header */}
                <div className="heading mb-8">
                    <h3 className="text-3xl font-bold mb-2">All Products</h3>
                    <p className='text-gray-600'>Manage your product inventory</p>
                </div>

                {/* Skeleton Product Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }, (_, index) => (
                        <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                            {/* Image Skeleton */}
                            <div className="w-full h-64 bg-gray-200 rounded-md animate-pulse mb-3"></div>

                            {/* Content Skeleton */}
                            <div className="space-y-3">
                                <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                <div className="flex justify-between items-center">
                                    <div className="w-16 h-5 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-7xl mx-auto py-10">
            {showPopUp &&
                <div className='fixed top-0 left-0 h-screen w-screen flex justify-center items-center bg-gray-950/20 z-50'>
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

            <div className="heading flex justify-between items-center mb-8">
                <div>
                    <h3 className="text-3xl font-bold mb-2">All Products</h3>
                    <p className='text-gray-600'>Manage your product inventory</p>
                </div>
                <Link to={'/dashboard/add-product'}>
                    <button className='custom_button'>Add Product</button>
                </Link>
            </div>

            {products.length > 0 ? (
                <div>
                    {/* Products Grid using ProductCard component */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                        {products.map((product) => (
                            <div key={product._id} className="relative group">
                                {/* Product Card */}
                                <DashboardProductCard p={product} />

                                {/* Admin Actions Overlay */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="flex gap-2">
                                        <Link to={`/dashboard/edit-product/${product._id}`}>
                                            <button className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                                                <Pencil size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info Badge */}
                                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <div className="bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                                        {product.images && product.images.length > 0 ? (
                                            <span>{product.images.length} {product.images.length === 1 ? 'image' : 'images'}</span>
                                        ) : (
                                            <span>No images</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className='flex my-8 justify-center items-center gap-3'>
                        <button
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage <= 1}
                            className={`custom_button ${currentPage <= 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Previous
                        </button>
                        <div className="count flex gap-1">
                            {Array.from({ length: pagination.pages }, (item, i) => (
                                <button
                                    onClick={() => goToPage(i + 1)}
                                    key={i}
                                    className={`custom_button ${currentPage === i + 1 ? 'bg-blue-500 text-white' : ''}`}>
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => goToPage(currentPage + 1)}
                            className={`custom_button ${currentPage >= (pagination.pages || 1) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage == pagination.pages}>
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-500">No products found</h3>
                    <p className="text-gray-400 mt-2">Start by adding your first product!</p>
                </div>
            )}
        </div>
    )
}

export default AllProductsPage
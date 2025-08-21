import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'sonner'
import { useNavigate, useParams } from 'react-router'

const schemaForProduct = yup.object({
    name: yup
        .string()
        .trim()
        .required('Product name is required')
        .min(3, 'Name must be at least 3 characters')
        .max(100, 'Name cannot exceed 100 characters'),

    description: yup
        .string()
        .trim()
        .required('Description is required')
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description cannot exceed 1000 characters'),

    price: yup
        .number()
        .typeError('Price must be a number')
        .positive('Price must be greater than 0')
        .required('Price is required'),

    category: yup
        .string()
        .trim()
        .required('Category is required'),

    stock: yup
        .number()
        .typeError('Stock must be a number')
        .integer('Stock must be an integer')
        .min(0, 'Stock cannot be negative')
        .required('Stock is required'),

    mainImage: yup
        .string()
        .optional(),
});

const EditProductPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [productData, setProductData] = useState({})
    const [uploadingImages, setUploadingImages] = useState(false)
    const [selectedImages, setSelectedImages] = useState([])
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue
    } = useForm({
        resolver: yupResolver(schemaForProduct),
    })

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    const uploadImages = async () => {
        if (selectedImages.length === 0) return;

        const token = localStorage.getItem("token");
        const formData = new FormData();

        selectedImages.forEach((file) => {
            formData.append('images', file);
        });

        try {
            setUploadingImages(true);
            const res = await fetch(`http://localhost:5555/api/products/${id}/images`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            const responseData = await res.json();

            if (responseData.success) {
                toast.success('Images uploaded successfully');
                setSelectedImages([]);
                // Refresh product data to show new images
                fetchProduct();
            } else {
                toast.error(responseData.message || 'Failed to upload images');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error('Failed to upload images');
        } finally {
            setUploadingImages(false);
        }
    };

    const deleteImage = async (imageId) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:5555/api/products/${id}/images/${imageId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const responseData = await res.json();

            if (responseData.success) {
                toast.success('Image deleted successfully');
                // Refresh product data
                fetchProduct();
            } else {
                toast.error(responseData.message || 'Failed to delete image');
            }
        } catch (error) {
            console.error('Delete error:', error);
            toast.error('Failed to delete image');
        }
    };

    const setMainImage = async (imageId) => {
        const token = localStorage.getItem("token");

        try {
            const res = await fetch(`http://localhost:5555/api/products/${id}/main-image`, {
                method: "PATCH",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageId })
            });

            const responseData = await res.json();

            if (responseData.success) {
                toast.success('Main image updated successfully');
                // Refresh product data
                fetchProduct();
            } else {
                toast.error(responseData.message || 'Failed to update main image');
            }
        } catch (error) {
            console.error('Update main image error:', error);
            toast.error('Failed to update main image');
        }
    };

    const onSubmit = async (data) => {
        const token = localStorage.getItem("token");

        try {
            setLoading(true)
            let res = await fetch(`http://localhost:5555/api/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
            let responseData = await res.json();

            if (responseData.success) {
                toast.success(responseData.message)
                navigate('/dashboard/all-products')
            } else {
                toast.error(responseData.message || 'Failed to update product');
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred while updating the product');
        } finally {
            setLoading(false)
        }
    }

    const fetchProduct = async () => {
        try {
            setLoading(true)
            let res = await fetch(`http://localhost:5555/api/products/${id}`);
            let data = await res.json();

            if (data?.product) {
                setProductData(data.product);
                // Populate form fields
                reset({
                    name: data.product.name || '',
                    description: data.product.description || '',
                    price: data.product.price || '',
                    category: data.product.category || '',
                    stock: data.product.stock || '',
                    mainImage: data.product.mainImage || ''
                });
            }
        } catch (error) {
            console.log(error)
            toast.error('Failed to fetch product');
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [id])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='py-10'>
            <div className="container max-w-md mx-auto p-10 bg-white">
                <div className="heading mb-5">
                    <h3 className='text-3xl font-bold'>Edit Product</h3>
                </div>

                {/* Current Images Display */}
                {productData.images && productData.images.length > 0 && (
                    <div className="mb-6 p-4 border rounded">
                        <h4 className="font-semibold mb-3">Current Images</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {productData.images.map((image) => (
                                <div key={image.filename} className="relative">
                                    <img
                                        src={`http://localhost:5555/uploads/products/${image.filename}`}
                                        alt={image.originalName}
                                        className="w-full h-24 object-cover rounded border"
                                    />
                                    <div className="absolute top-1 right-1 flex gap-1">
                                        {productData.mainImage === image.filename ? (
                                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">Main</span>
                                        ) : (
                                            <button
                                                onClick={() => setMainImage(image.filename)}
                                                className="bg-blue-500 text-white text-xs px-2 py-1 rounded hover:bg-blue-600"
                                            >
                                                Set Main
                                            </button>
                                        )}
                                        <button
                                            onClick={() => deleteImage(image.filename)}
                                            className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Add New Images */}
                <div className="mb-6 p-4 border rounded">
                    <h4 className="font-semibold mb-3">Add New Images</h4>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="custom_input mb-3"
                    />
                    {selectedImages.length > 0 && (
                        <div className="mb-3">
                            <p className="text-sm text-gray-600 mb-2">
                                Selected {selectedImages.length} image(s):
                            </p>
                            <div className="flex gap-2 flex-wrap">
                                {selectedImages.map((file, index) => (
                                    <div key={index} className="text-xs text-gray-600">
                                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {selectedImages.length > 0 && (
                        <button
                            type="button"
                            onClick={uploadImages}
                            disabled={uploadingImages}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        >
                            {uploadingImages ? 'Uploading...' : 'Upload Images'}
                        </button>
                    )}
                </div>

                <form action="" onSubmit={handleSubmit(onSubmit)} className=''>
                    <div className="form-group">
                        <label htmlFor="name">Product Name*</label>
                        <input className='custom_input' placeholder='Enter Product Name' defaultValue="" {...register("name", { required: true })} />
                        {errors.name && <p className='custom_error'>{errors.name.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Product Details*</label>
                        <textarea className='custom_input' rows={3} placeholder='Enter Description' defaultValue="" {...register("description", { required: true })}></textarea>
                        {errors.description && <p className='custom_error'>{errors.description.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Product Price*</label>
                        <input className='custom_input' placeholder='Enter Product Price' defaultValue="" {...register("price", { required: true })} />
                        {errors.price && <p className='custom_error'>{errors.price.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category*</label>
                        <input className='custom_input' placeholder='Enter Category' defaultValue="" {...register("category", { required: true })} />
                        {errors.category && <p className='custom_error'>{errors.category.message}</p>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="stock">Stock*</label>
                        <input type='number' className='custom_input' placeholder='Enter stock' defaultValue="" {...register("stock")} />
                        {errors.stock && <p className='custom_error'>{errors.stock.message}</p>}
                    </div>

                    <button className='custom_button' type="submit" disabled={loading}>
                        {loading ? 'Updating...' : "Update Product"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProductPage
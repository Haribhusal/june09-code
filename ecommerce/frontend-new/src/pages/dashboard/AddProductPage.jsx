import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { BACKEND_URL } from './../../config/config'

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

    discount: yup
        .number()
        .positive('discount must be greater than 0')
        .typeError('discount must be a number'),

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


    image: yup
        .mixed()
        .required('Product image is required')
        .test('fileType', 'Only image files are allowed (JPEG, PNG, WebP)', (value) => {
            if (!value || !value[0]) return true; // Skip if no file
            return ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(value[0].type);
        })
        .test('fileSize', 'File size is too large. Maximum size is 5MB', (value) => {
            if (!value || !value[0]) return true; // Skip if no file
            return value[0].size <= 5 * 1024 * 1024; // 5MB
        }),
});

const AddProductPage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

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
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setValue('image', e.target.files);
        }
    };

    const onSubmit = async (data) => {

        console.log(data)

        const token = localStorage.getItem("token");

        try {
            setLoading(true)

            // Create FormData for multipart/form-data submission
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('discount', data.discount)
            formData.append('category', data.category);
            formData.append('stock', data.stock);

            if (data.image && data.image[0]) {
                formData.append('image', data.image[0]);
            }

            let res = await fetch(`${BACKEND_URL}/api/products`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                    // Don't set Content-Type for FormData, let browser set it with boundary
                },
                body: formData
            })

            let responseData = await res.json();

            if (responseData.success) {
                toast.success(responseData.message)
                navigate('/dashboard/all-products')
                reset();
                setSelectedImage(null);
            } else {
                toast.error(responseData.message || 'Failed to create product');
            }
        } catch (error) {
            console.log(error)
            toast.error('An error occurred while creating the product');
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='py-10'>
            <div className="container max-w-md mx-auto p-10 bg-white">
                <div className="heading mb-5">
                    <h3 className='text-3xl font-bold'>Add New Product</h3>
                </div>
                <form action="" onSubmit={handleSubmit(onSubmit)} className=''>
                    {/* name, description, price, category, stock, image */}

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
                        <label htmlFor="price">Product Discount</label>
                        <input className='custom_input' type='number' placeholder='Enter Discount Percentage' defaultValue="" {...register("discount")} />
                        {errors.discount && <p className='custom_error'>{errors.discount.message}</p>}
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

                    <div className="form-group">
                        <label htmlFor="image">Product Image*</label>
                        <input
                            type="file"
                            className='custom_input'
                            accept="image/*"
                            onChange={handleImageChange}
                            {...register("image")}
                        />
                        {errors.image && <p className='custom_error'>{errors.image.message}</p>}

                        {selectedImage && (
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">
                                    Selected: {selectedImage.name} ({(selectedImage.size / 1024 / 1024).toFixed(2)} MB)
                                </p>
                                <div className="mt-2">
                                    <img
                                        src={URL.createObjectURL(selectedImage)}
                                        alt="Preview"
                                        className="w-24 h-24 object-cover rounded border"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button className='custom_button' type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddProductPage
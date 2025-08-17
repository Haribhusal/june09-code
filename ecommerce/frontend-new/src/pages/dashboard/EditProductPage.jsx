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

    image: yup
        .string()
        .url('Image must be a valid URL')
});



const EditProductPage = () => {
    const { id } = useParams();
    console.log(id)

    const [loading, setLoading] = useState(false)
    const [productData, setProductData] = useState({})
    const navigate = useNavigate();

    console.log(productData)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(schemaForProduct),
    })

    const onSubmit = async (data) => {
        const token = localStorage.getItem("token"); // or your token key

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
                reset();
            }
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }


        console.log(responseData)
    }



    useEffect(() => {
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
                        image: data.product.image || ''
                    });
                }

                setProductData(data.product)

                if (data.success) {
                    toast.success(data.message || "Updated successfully")
                    navigate('/dashboard/all-products')
                }

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }
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
                <form action="" onSubmit={handleSubmit(onSubmit)} className=''>
                    {/* name, description, price, category,stock, image */}

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
                        <input className='custom_input' placeholder='Enter stock' defaultValue="" {...register("stock")} />
                        {errors.stock && <p className='custom_error'>{errors.stock.message}</p>}

                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Product Image</label>
                        <input className='custom_input' placeholder='Enter Image Path' defaultValue="" {...register("image")} />
                        {errors.image && <p className='custom_error'>{errors.image.message}</p>}

                    </div>
                    <button className='custom_button' type="submit" >{loading ? 'Submitting...' : "Submit"}</button>
                </form>
            </div>

        </div>
    )
}

export default EditProductPage
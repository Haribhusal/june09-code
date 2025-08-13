import React from 'react'


import { useForm } from "react-hook-form"

import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"



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
        .required('Image URL is required'),
});



const AddProductPage = () => {


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schemaForProduct),
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>

            <form action="" onSubmit={handleSubmit(onSubmit)}>

                {/* name, description, price, category,stock, image */}

                <input placeholder='Enter Product Name' defaultValue="" {...register("name", { required: true })} />
                {errors.name && <p>This is required.</p>}



                <textarea rows={3} placeholder='Enter Description' defaultValue="" {...register("description", { required: true })}></textarea>
                <input placeholder='Enter Product Price' defaultValue="" {...register("price", { required: true })} />
                <input placeholder='Enter Category' defaultValue="" {...register("category", { required: true })} />
                <input placeholder='Enter stock' defaultValue="" {...register("stock")} />
                <input placeholder='Enter Image Path' defaultValue="" {...register("image")} />

                <input type="submit" />


            </form>
        </div>
    )
}

export default AddProductPage
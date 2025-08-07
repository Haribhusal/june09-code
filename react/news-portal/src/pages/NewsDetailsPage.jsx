import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import useFetch from '../hooks/useFetch';

const NewsDetailsPage = () => {

    let { id } = useParams();
    let { data, loading, error, refetch } = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (error) {
        return (
            <div>Error: {error}</div>
        )
    }
    if (loading) {
        return (
            <div className='py-10'>
                <div className='bg-gray-300 animate animate-pulse h-12 w-full'>

                </div>
            </div>
        )
    }
    return (
        <div className='py-10'>
            <h3 className='text-5xl font-bold text-blue-500 mb-5'>
                {data.title}
            </h3>
            <p>
                {data.body}
            </p>
        </div>
    )
}

export default NewsDetailsPage
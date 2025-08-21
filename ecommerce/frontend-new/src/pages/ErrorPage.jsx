import React from 'react'
import { Link, useRouteError } from 'react-router'

const ErrorPage = () => {

    const error = useRouteError();
    console.error(error);

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className="error-message max-w-md w-full p-10 rounded-md shadow">
                <h3 className='text-3xl font-bold text-red-500'>Page not found</h3>
                <p>
                    <i>{error.statusText || error.message || "Unexpected error"}</i>
                </p>
                <div className="mt-10">
                    <Link to={'/'}>
                        <button className='custom_button'>Go to Homepage</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage
import React from 'react'
import { Link } from 'react-router'

const DashboardMenu = () => {
    return (
        <div className='p-10'>
            <div className="heading">
                <h3>Welcome Admin</h3>
            </div>
            <ul>
                <li>
                    <Link to={'add-product'}>Add Product</Link>
                </li>
                <li>
                    <Link to={'view-product'}>View Products</Link>
                </li>
            </ul>
        </div>
    )
}

export default DashboardMenu
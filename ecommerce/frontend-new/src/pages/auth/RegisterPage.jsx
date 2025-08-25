import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'sonner'
import { BACKEND_URL } from './../../config/config'

const RegisterPage = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [formData, setFormData] = useState({
        name: '', email: '', password: ''
    })
    console.log(formData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    const handeSubmit = async (e) => {
        e.preventDefault();

        try {

            let res = await fetch(`${BACKEND_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            let data = await res.json();
            console.log(data)
            if (data.existingUser) {
                setErrorMessage(data.message)

            }

            if (data.success) {
                setSuccessMessage(data.message);
                toast.success(data.message)
                navigate('/auth/login')
            }




        } catch (error) {

        }


    }

    return (
        // name, email, password, role
        <div className='flex justify-center items-center min-h-screen bg-gray-100'>
            <div className="mx-auto max-w-2xl w-full p-10 shadow bg-white">
                <h3 className='text-3xl font-bold mb-5'>Register Page</h3>
                <form action="" onSubmit={handeSubmit}>
                    <div className="item">
                        <label htmlFor="">Name</label>
                        <input className='custom_input' name="name" value={formData.name} onChange={handleChange} type="text" placeholder='name' />
                    </div>
                    <div className="item">
                        <label htmlFor="">Email</label>
                        <input className='custom_input' name="email" value={formData.email} onChange={handleChange} type="text" placeholder='email' />
                    </div>
                    <div className="item">
                        <label htmlFor="">Password</label>
                        <input className='custom_input' name="password" value={formData.password} onChange={handleChange} type="password" placeholder='password' />
                    </div>

                    {errorMessage &&
                        <div className='text-red-500 bg-red-200 px-5 py-3 rounded-md'>
                            {errorMessage}
                        </div>
                    }

                    <button className='custom_button'>Submit</button>

                    <div className="goto mt-5 text-slate-500 text-sm">
                        <Link to='/auth/login'>Already have account? Login Now</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage
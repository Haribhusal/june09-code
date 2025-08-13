import React, { useState } from 'react'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }


    const handleSubmit  = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5555/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data)
        } catch (error) {
            console.log(error)
            
        }
    }    
  return (
   <section>
    <div className="container max-w-3xl mx-auto my-10">
        <div className="flex flex-col justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold text-center">Register</h1>
            </div>
            <div className="w-full max-w-md">
                <form className="mt-8" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input onChange={handleChange} type="text" id="name" className="mt-1 px-5 border py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input onChange={handleChange}  type="email" id="email" className="mt-1 px-5 border py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <input onChange={handleChange}  type="password" id="password" className="mt-1 px-5 border py-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>  
                            
                            <div>
                                <button  type="submit" className="w-full flex  justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
                            </div>
                        </div>
                </form>
            </div>
        </div>
        
    </div>
   </section>
  )
}

export default RegisterPage
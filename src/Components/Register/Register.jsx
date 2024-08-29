import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {

    const [isloading, setIsloading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const navigate = useNavigate()

    const initialValues = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    };

    async function onSubmit(values) {
        setSuccessMsg("")
        setErrorMsg("")
        setIsloading(true)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).then(({ data }) => {
            setIsloading(false)
            console.log(data)
            setSuccessMsg(data.message)
            setTimeout(()=>{
                navigate("/login")
            },500)
        }).catch((error) => {
            setIsloading(false)
            console.log(error.response.data.message)
            setErrorMsg(error.response.data.message)
        })
    }

    let validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'min lingth 3 char').max(15, 'max length 15 char').required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(/^[A-Z]\w{5,10}$/, 'password EX (Ahmed123)').required('pass is required'),
        rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        phone: Yup.string().matches(/^(002)?01[0125][0-9]{8}$/, 'phone must be egyption number').required('phone is required')
    })

    let formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <>
            <div className='min-h-screen flex items-center justify-center px-10 md:px-0'>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-2xl px-8 py-10 flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My FreshCart</h1>
                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="name" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Name:</label>
                            <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="name" name="name" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.name && formik.touched.name && <div className="text-red-500">{formik.errors.name}</div>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                            <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.email && formik.touched.email && <div className="text-red-500">{formik.errors.email}</div>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="password" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Password:</label>
                            <input value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password" name="password" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.password && formik.touched.password && <div className="text-red-500">{formik.errors.password}</div>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="rePassword" className="text-sm text-gray-700 dark:text-gray-200 mr-2"> Re Password:</label>
                            <input value={formik.values.rePassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="rePassword" name="rePassword" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.rePassword && formik.touched.rePassword && <div className="text-red-500">{formik.errors.rePassword}</div>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="phone" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone Number:</label>
                            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.phone && formik.touched.phone && <div className="text-red-500">{formik.errors.phone}</div>}
                        </div>

                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isloading} >Register {isloading && <i className='fas fa-spinner fa-spin'></i>} </button>
                        {errorMsg && <p className='text-red-500 text-center font-bold text-2xl  italic fa-fade'>{errorMsg} <i class="fa-solid fa-triangle-exclamation fa-fade"></i></p>}
                        {successMsg && <p className='text-green-500 text-center font-bold text-2xl underline fa-bounce'>{successMsg}</p>}
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-500 dark:text-gray-300">Already have an account? </span>
                        <Link to={"/login"} className="text-blue-500 hover:text-blue-600">Login</Link>
                    </div>
                </div>
            </div>
        </>

    )
}

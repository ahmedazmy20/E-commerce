import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { AuthContext } from '../../Contexts/AuthContext';

export default function login() {
    const navigate = useNavigate()
    const [isloading, setIsloading] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const { setUserToken } = useContext(AuthContext)

    const initialValues = {
        email: '',
        password: '',
    };
    async function onSubmit(values) {
        setErrorMsg("")
        setIsloading(true)
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(({ data }) => {
            setIsloading(false)
            setUserToken(data.token)
            localStorage.setItem("token", data.token)
            if (location.pathname == "/login") {
                navigate("/")
            } else {
                navigate(location.pathname)
            }

        }).catch((err) => {
            setIsloading(false)
            setErrorMsg(err.response.data.message)
            console.log(err.response.data.message);
        })
    }

    let validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().matches(/^[A-Z]\w{5,10}$/, 'password EX (Ahmed123)').required('pass is required'),
    })

    let formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <>
            <div className='my-20 flex items-center justify-center px-10 md:px-0'>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-2xl px-8 py-10 flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Welcome to My FreshCart</h1>
                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">


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


                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isloading}>Login {isloading && <i className='fas fa-spinner fa-spin'></i>}</button>
                        {errorMsg && <p className='text-red-500 text-center font-bold text-2xl  italic fa-fade'>{errorMsg}</p>}
                    </form>
                    <div className="mt-4 text-center">
                        <span className="text-sm text-gray-500 dark:text-gray-300">Dont have account? </span>
                        <Link to={"/register"} className="text-blue-500 hover:text-blue-600">Register</Link>
                    </div>
                    <Link to={"/forgetpass"}  className="text-blue-500 hover:text-blue-600">forget password?</Link>
                </div>
            </div>
        </>

    )
}

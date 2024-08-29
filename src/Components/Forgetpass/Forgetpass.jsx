import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'


export default function Forgetpass() {
    const [isloading, setIsloading] = useState(false)
    const [pass, setPass] = useState(null)

    async function getPass(values) {
        setIsloading(true)
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
        setPass(data.data)
        console.log(data);
        setIsloading(false)
        
    }


    const initialValues = {
        email: '',
    };

    let validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
    })

    let formik = useFormik({
        initialValues,
        onSubmit: getPass,
        validationSchema
    })


    return (<>
        <div className='my-20 flex items-center justify-center'>
            <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-2xl px-8 py-10 flex flex-col items-center">
                <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Restart password</h1>
                <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">


                    <div className="flex items-start flex-col justify-start">
                        <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                        <input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                        {formik.errors.email && formik.touched.email && <div className="text-red-500">{formik.errors.email}</div>}
                    </div>

                    <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isloading}>Reset {isloading && <i className='fas fa-spinner fa-spin'></i>}</button>
                  
                </form>

            </div>
        </div>
    </>
    )
}

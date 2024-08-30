import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import * as Yup from 'yup'

export default function ShippingAddress() {
    const [isloading, setIsloading] = useState(false)


    const initialValues = {
        details: '',
        phone: '',
        city: ''
    };

    const id = localStorage.getItem("id")
    async function onSubmit(values) {
        setIsloading(true)
        await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}`, { shippingAddress: values }, {
            headers: {
                token: localStorage.getItem("token")
            },
            params: {
                url: 'http://localhost:5173'
            }
        }).then(({ data }) => {
            setIsloading(false)
            window.location.href = data.session.url;
        }).catch((err) => {
            setIsloading(false)
        })
    }

    let validationSchema = Yup.object().shape({
        details: Yup.string().required('Details is required'),
        phone: Yup.string().required('Phone is required'),
        city: Yup.string().required('City is required'),
    })

    let formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })

    return (
        <>
            <div className='my-20 flex items-center justify-center'>
                <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-2xl px-8 py-10 flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Add your shipping address</h1>
                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-4">


                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">City:</label>
                            <input value={formik.values.city} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="city" name="city" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.city && formik.touched.city && <div className="text-red-500">{formik.errors.city}</div>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="details" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Details:</label>
                            <input value={formik.values.details} onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="details" name="details" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.details && formik.touched.details && <div className="text-red-500">{formik.errors.details}</div>}
                        </div>

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="city" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Phone:</label>
                            <input value={formik.values.phone} onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id="phone" name="phone" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {formik.errors.phone && formik.touched.phone && <div className="text-red-500">{formik.errors.phone}</div>}
                        </div>


                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500" disabled={isloading}>chickout {isloading && <i className='fas fa-spinner fa-spin'></i>}</button>
                    </form>
                </div>
            </div>
        </>

    )
}

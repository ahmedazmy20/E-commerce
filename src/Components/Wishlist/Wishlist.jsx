import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadindScreen from '../LoadindScreen/LoadindScreen'
import { Helmet } from 'react-helmet'
import { addProductToCart } from '../../cartService'

export default function Wishlist() {


    const [isloading, setIsloading] = useState(false)
    const [wishlist, setWishlist] = useState(null)
    const [productCount, setProductCount] = useState([])

    useEffect(() => {
        getUserWishlist()
    }, [productCount])

    async function getUserWishlist() {
        setIsloading(true)
        let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setWishlist(data);
        setIsloading(false)
    }

    async function removeProductFromWishlist(productId) {
        let { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        setProductCount(data)
    }


    return (<>
        <Helmet>
            <title>Wishlist</title>
        </Helmet>
        {isloading ? <LoadindScreen /> : <div className=" pt-10">
            <h1 className="mb-14 text-center text-green-500 text-3xl font-bold italic">WishList Items <i className="fa-solid fa-heart fa-bounce ms-2 text-red-600"></i></h1>
            <div className="mx-auto w-full">
                <div className="rounded-lg  w-full">
                    {wishlist?.data.map((product, index) => {
                        return <>
                            <div key={index} className="flex flex-col lg:flex-row justify-between items-center m-4">
                                <img src={product.imageCover} alt="whishlist-image" className=" rounded-lg w-40 md:w-52 " />
                                <div className="p-10 text-center md:text-start">
                                    <p className="text-lg font-bold line-clamp-1">{product.title}</p>
                                    <p className="mb-1 text-lg font-bold">{product.price} EGP</p>
                                    <p className="text-sm text-green-700">{product.sold} Sold</p>
                                    <p className="text-md text-gray-900 line-clamp-2">{product.description}</p>
                                    <button onClick={() => removeProductFromWishlist(product._id)} className='text-white bg-red-300 hover:bg-red-600 px-2 pb-1 mt-3 font-semibold text-xl  rounded-lg  duration-200 block mx-auto ' >Remove</button>
                                </div>
                                <div className=' flex items-center justify-center w-full '>
                                    <button onClick={() => addProductToCart(product._id)} className="mt-6 py-2 px-2 block text-center rounded-md bg-blue-500 font-medium text-blue-50 hover:bg-blue-600">Add to cart</button>
                                </div>
                            </div>
                        </>
                    })}
                    <hr className="my-4" />
                </div>

            </div>
        </div>}
    </>
    )
}

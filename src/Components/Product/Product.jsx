import React, { useContext } from 'react'
import RatingStars from '../RatingStars/RatingStars'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'
import { addProductToCart } from '../../cartService'
import { addProductToWishlist } from '../../wishlistServies'

export default function Product({ product }) {

    let { userToken } = useContext(AuthContext)
    return (<>
        <div className="max-w-2xl ">
            <div className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700">
                <Link to={"/productDetails/" + product._id}>
                    <img className="rounded-t-xl p-4 md:p-8 " src={product.imageCover} alt="product image" />
                </Link>
                <div className="px-5 pb-5">
                    <Link to={"/productDetails/" + product._id}>
                        <h3 className=" text-gray-900 font-semibold text-xl tracking-tight dark:text-white line-clamp-1">{product.title}</h3>
                    </Link>
                    <p className=' line-clamp-1 my-0 md:my-4 md:line-clamp-2'>{product.description}</p>
                    <RatingStars rating={product.ratingsAverage} />
                    <div className="flex items-center justify-between flex-col md:flex-row ">
                        <span className="lg:text-3xl font-bold text-gray-900 dark:text-white">{product.price} <span className='text-lg  font-medium'>EGP</span></span>
                        <button onClick={() => addProductToCart(product._id, userToken)} className="text-white bg-blue-700 hover:bg-blue-800 focus:bg-green-500 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-4 md:mb-0">Add to cart</button>
                        <button onClick={() => addProductToWishlist(product._id)} className=" focus:text-red-600 fa-solid fa-heart fa-xl"></button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

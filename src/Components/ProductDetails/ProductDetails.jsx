import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import RatingStars from '../RatingStars/RatingStars';
import LoadindScreen from '../LoadindScreen/LoadindScreen';
import ProductImageSlider from '../ProductImageSlider/ProductImageSlider';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import { addProductToCart } from '../../cartService';
import { AuthContext } from '../../Contexts/AuthContext';
import { addProductToWishlist } from '../../wishlistServies';



export default function ProductDetails() {
    let { id } = useParams();
    const [productDetails, setProductDetails] = useState(null)
    const [relatedProductDetails, setRelatedProductDetails] = useState([])
    const [isloading, setIsloading] = useState(true)

    let { userToken } = useContext(AuthContext)

    useEffect(() => {
        getProductDelails()
    }, [id]);

    async function getProductDelails() {
        setIsloading(true)
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products/" + id)
        setProductDetails(data.data)
        getRelatedProducts(data.data.category._id)
        setIsloading(false)
    }

    async function getRelatedProducts(categoryId) {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products", {
            params: {
                "category": categoryId
            }
        })
        setRelatedProductDetails(data.data)

    }


    return (<>
        {
            isloading ? <LoadindScreen />
                :
                <div className="bg-white">

                    <main className="my-8">
                        <div className="container mx-auto px-6 overflow-hidden">
                        <h2 className='font-bold text-3xl italic'>Product Details <i className="fa-regular fa-pen-to-square ms-3 fa-shake"></i></h2>
                            <div className="md:flex md:items-center">
                                
                                <div className="w-full    md:w-3/12 lg:h-96 ">
                                    <ProductImageSlider images={productDetails?.images} />
                                </div>

                                <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-9/12">
                                    <h3 className="text-gray-700 uppercase text-lg">{productDetails?.title}</h3>
                                    <span className="text-blue-700 mt-3">{productDetails?.price} <span>EGP</span> </span>
                                    <hr className="my-3" />

                                    <div className="mt-3">
                                        {/* <label className="text-black " htmlFor="count">Rating:</label> */}
                                        <RatingStars rating={productDetails?.ratingsAverage} />
                                        <h3> {productDetails?.category.name}</h3>
                                    </div>
                                    <div className="mt-3">
                                        {/* <label className="text-black text-lg font-semibold" htmlFor="count">Discription:</label> */}
                                        <h3 className='line-clamp-5'> {productDetails?.description}</h3>
                                    </div>
                                    <div className="mt-3">
                                        {/* <label className="text-black text-lg font-semibold" htmlFor="count">Category :</label> */}
                                        <h3> {productDetails?.category.name}</h3>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-black text-lg font-semibold" htmlFor="count">Sub Category:</label>
                                        <h3> {productDetails?.subcategory[0].name}</h3>
                                    </div>
                                    <div className="mt-3">
                                        <label className="text-black text-lg font-semibold" htmlFor="count">Brand :</label>
                                        <h3> {productDetails?.brand.name}</h3>
                                    </div>
                                    <div className="flex items-center mt-6">
                                        <Link to={"/cart"} onClick={() => addProductToCart(productDetails._id, userToken)} className="px-8 py-2 bg-indigo-600 text-white text-sm font-medium   rounded hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500">Order Now</Link>
                                        <button onClick={() => addProductToCart(productDetails._id, userToken)} className="mx-2 text-gray-600 border rounded-md p-2 hover:bg-green-600 hover:text-white duration-200 focus:outline-none">
                                            <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                        </button>
                                        <button onClick={() => addProductToWishlist(productDetails._id)} className=" focus:text-red-600 fa-solid fa-heart fa-2x"></button>
                                    </div>
                                </div>
                            </div>

                            <RelatedProducts product={relatedProductDetails} />

                        </div>
                    </main>
                </div >
        }

    </>)
}

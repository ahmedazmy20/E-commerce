import React, { Component, useContext } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { addProductToCart } from "../../cartService";
import { AuthContext } from "../../Contexts/AuthContext";
import { addProductToWishlist } from "../../wishlistServies";

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

function CustomArrows({ product }) {
    let{ userToken } = useContext(AuthContext)

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        speed: 1500,
        autoplaySpeed: 2000,
        cssEase: "linear",
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
    };
    return (
        <div className="mt-16 text-center  shadow-lg shadow-green-600 ">
            <h3 className="text-gray-600 text-xl py-5 font-medium italic fa-beat ">More Products <i className="fa-solid fa-arrows-turn-right"></i> </h3>
            <Slider {...settings}>
                {product.map((product, index) => {
                    return <div key={index} className="w-full border-4  max-w-sm mx-auto rounded-md  shadow-xl overflow-hidden">
                        <div className="flex  items-end justify-end h-56 w-full bg-cover bg-center" style={{ "backgroundImage": `url(${product.imageCover})` }}>
                            <button onClick={()=> addProductToCart(product._id, userToken)} className="p-2 rounded-full  bg-blue-600 text-white mx-5 -mb-4 hover:bg-green-600 duration-200 focus:outline-none focus:bg-blue-500">
                                <svg  className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            </button>
                        </div>
                        <div className="px-5 py-3">
                            <Link to={"/productDetails/" + product._id}>
                                <h3 className="text-gray-700 uppercase line-clamp-1 my-2 hover:text-white duration-300 hover:bg-zinc-600 rounded-full">{product.title}</h3>
                            </Link>
                            <div className="flex justify-between">
                            <span className="text-gray-500 mt-2">{product.price} <span>EGP</span> </span>
                            <button onClick={() => addProductToWishlist(product._id)} className=" focus:text-red-600 fa-solid fa-heart fa-2x "></button>
                            </div>
                        </div>
                    </div>
                })}
            </Slider>
        </div>
    );
}

export default CustomArrows;

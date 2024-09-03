import React from 'react'
import Slider from "react-slick";


export default function ProductImageSlider({images}) {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        cssEase: "linear",
        nextArrow: <></>,
        prevArrow: <></>,
    };

    return (
        <Slider  {...settings} >
            {images?.map((img, index) => {
                return <img key={index} src={img} className=" sm:ps-16  md:p-0 h-60 md:h-full w-full rounded-md max-w-lg mx-auto object-contain " alt="Nike Air" />
            }
            )}
        </Slider>
    )
}

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoryHomeSlider() {

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 1500,
        cssEase: "linear",
    };

    async function getcategories(params) {
        return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    let{ data } = useQuery({
        queryKey: ['categories'],
        queryFn: getcategories,
    })

    return (<>
        <Slider  {...settings}>
            {data?.data.data.map((category, index) => <div key={index} className='my-5 p-2  '>
                <img src={category.image} className="  lg:w-56  lg:h-[240px] w-full h-[150px]" alt="Nike Air" />
                <h3 className='text-center'>{category.name}</h3>
            </div>)}
        </Slider>

    </>

    )
}

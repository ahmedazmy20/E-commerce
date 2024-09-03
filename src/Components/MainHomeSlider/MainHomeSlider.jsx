import React from 'react'
import slid1 from "../../assets/imgs/slid222.jpg"
import slid2 from "../../assets/imgs/slid44.webp"
import slid3 from "../../assets/imgs/slid55.jpg"
import slid4 from "../../assets/imgs/slide11.jpg"
import slid5 from "../../assets/imgs/slide333.jpg"
import Slider from 'react-slick';

export default function MainHomeSlider() {

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <></>,
    prevArrow: <></>,
  };

  return (<>
    <div className='flex px-2'>
      <div className='w-full px-4 md:px-0 md:w-3/4'>
        <Slider  {...settings} >
          <img src={slid1} className='w-full h-[200px] md:h-[400px] lg:h-[500px]' alt="" />
          <img src={slid2} className='w-full h-[200px] md:h-[400px] lg:h-[500px]' alt="" />
          <img src={slid3} className='w-full h-[200px] md:h-[400px] lg:h-[500px]' alt="" />
        </Slider>
      </div>
      <div className='w-0 md:w-1/4  '>
        <img src={slid4} className='w-full h-[100px] md:h-[200px] lg:h-[250px] ' alt="" />
        <img src={slid5} className='w-full h-[100px] md:h-[200px] lg:h-[250px] ' alt="" />
      </div>
    </div>
  </>
  )
}

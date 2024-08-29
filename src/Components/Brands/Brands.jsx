import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadindScreen from '../LoadindScreen/LoadindScreen'
import { Helmet } from 'react-helmet'
import Brand from '../Brand/Brand'
import { useQuery } from '@tanstack/react-query'

export default function Brands() {

  async function getBrands() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }

  let { data , isLoading } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
  })


  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      <h2 className='text-center font-semibold text-6xl mb-10 text-green-800'>All Brands</h2>

     { isLoading ? <LoadindScreen />:<div className='grid p-3 md:p-0 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 '>

        {data?.data.data.map((brand, index) => {
          return <Brand brand={brand} key={index} />
        })}

      </div>}

    </>
  )
}

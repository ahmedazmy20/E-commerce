import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Product from '../Product/Product'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'
import LoadindScreen from '../LoadindScreen/LoadindScreen'

export default function Products() {


  function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products') 
  }

  let { data , isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>

      {isLoading ? <LoadindScreen /> :<div className='grid grid-cols-2 px-6 md:px-0 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {data?.data.data.map((product, index) => {
          return <Product key={index} product={product} />
        })}
      </div>
}


    </>
  )
}


import axios from 'axios'
import Product from '../Product/Product'
import LoadindScreen from '../LoadindScreen/LoadindScreen'
import CategoryHomeSlider from '../CategoryHomeSlider/CategoryHomeSlider'
import MainHomeSlider from '../MainHomeSlider/MainHomeSlider'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'
export default function Home() {


  async function getProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  let { data ,isLoading} = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })


  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>

      <MainHomeSlider />
      <div className='my-9  shadow-green-100 shadow-xl'>
        <CategoryHomeSlider />
      </div>
      {isLoading ? <LoadindScreen />:<div className='grid grid-cols-2 px-10 md:grid-cols-3 md:px-0 lg:grid-cols-4 gap-4'>
        {data?.data.data.map((product, index) => {
          return <Product key={index} product={product} />

        })}
      </div>}


    </>
  )
}

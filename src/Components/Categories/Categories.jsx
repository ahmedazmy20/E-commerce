import axios from 'axios'
import Category from '../Category/Category'
import LoadindScreen from '../LoadindScreen/LoadindScreen'
import { Helmet } from 'react-helmet'
import { useQuery } from '@tanstack/react-query'

export default function Categories() {

  async function getCategories() {
    return await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  let { data,isLoading} = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
  
  return (
    <>
      <Helmet>
        <title>Categories</title>
      </Helmet>
     
     {isLoading ? <LoadindScreen />: <div className='grid grid-cols-3 px-2 md:px-0 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 '>
        {data?.data.data.map((categorie, index) => {
          return <Category categorie={categorie} key={index} />
        })}
      </div>}

    </>
  )
}

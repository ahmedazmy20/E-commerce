import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadindScreen from '../LoadindScreen/LoadindScreen'
import CartProduct from '../CartProduct/CartProduct'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

  const [isloading, setIsloading] = useState(false)

  const [cart, setCart] = useState(null)
  useEffect(() => {
    getUseCart()
  }, [])


  async function getUseCart() {
    setIsloading(true)
    let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    }).finally(() => {
      setIsloading(false)
    })
    setCart(data);
    localStorage.setItem("id",data.cartId)
    

  }

  function clearCart() {
    axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: {
        token: localStorage.getItem("token")
      }
    }).finally(() => {
      setCart(null)
    })

  }

  if (isloading) {
    return <LoadindScreen />
  }

  return (<>
    <Helmet>
      <title>Cart</title>
    </Helmet>
    {cart ? isloading ? <LoadindScreen /> : <div className=" pt-10">
      <h1 className="mb-14 text-center text-green-500 text-3xl font-bold italic">Cart Items <i className=" ms-2 fa-solid fa-cart-flatbed-suitcase fa-bounce"></i></h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">

          {cart?.data.products.map((product, index) => {
            return <CartProduct key={index} product={product} cart={cart} setCart={setCart} />
          })}

        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">EGP{cart?.data.totalCartPrice}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">EGP 0</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{cart?.data.totalCartPrice} EGP</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to={"/ShippingAddress"} className="mt-6 block text-center rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</Link>
        </div>
      </div>
      <button onClick={() => clearCart()} className='text-red-500 border-2 border-red-500 p-2 mt-2 rounded-lg hover:bg-red-600 hover:text-white hover:border-yellow-500 duration-200 block mx-auto'>Clear cart</button>
    </div> : <h1 className='text-center font-bold text-4xl fa-bounce py-56'>no products in your cart</h1>}
  </>
  )
}

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Cart from './Components/Cart/Cart'
import Wishlist from './Components/Wishlist/Wishlist'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brands from './Components/Brands/Brands'
import Notfound from './Components/Notfound/Notfound'
import CounterContextProvider from './Contexts/CounterContext'
import AuthContextProvider from './Contexts/AuthContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProtectAuthRouts from './Components/ProtectAuthRouts/ProtectAuthRouts'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import { ToastContainer } from 'react-toastify'
import ShippingAddress from './Components/ShippingAddress/ShippingAddress'
import Orders from './Components/Orders/Orders'
import { Offline, Online } from 'react-detect-offline'
import Forgetpass from './Components/Forgetpass/Forgetpass'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


function App() {
  const queryClient = new QueryClient()

  const route = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'login', element: <ProtectAuthRouts><Login /></ProtectAuthRouts> },
        { path: 'register', element: <ProtectAuthRouts> <Register /></ProtectAuthRouts> },
        { path: 'forgetpass', element: <ProtectAuthRouts> <Forgetpass /></ProtectAuthRouts> },
        { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'wishlist', element: <ProtectedRoute><Wishlist /></ProtectedRoute> },
        { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'shippingAddress', element: <ProtectedRoute><ShippingAddress /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: "productDetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },
      ]
    }
  ])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <CounterContextProvider>
            <RouterProvider router={route}> </RouterProvider>
            <ToastContainer />
          </CounterContextProvider>
        </AuthContextProvider>
        <Offline ><div className='p-4 bg-yellow-300 fixed bottom-4 start-4 rounded-md'>Chick your internet first</div></Offline>
        <ReactQueryDevtools/>
      </QueryClientProvider>
    </>
  )
}

export default App

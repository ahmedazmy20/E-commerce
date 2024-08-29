import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Products from '../Products/Products'

export default function Layout() {
    return (
        <>
            <Navbar />
            <div className='py-8 container mx-auto xl:px-20 '>
                <Outlet />
            </div>
            <Footer />
        </>
    )
}

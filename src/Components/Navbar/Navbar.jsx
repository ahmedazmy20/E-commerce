import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Contexts/AuthContext'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { userToken ,setUserToken } = useContext(AuthContext)
  const navigate = useNavigate()

  function Signout(){
    setUserToken("")
    localStorage.removeItem("token")
    navigate("/login")
  }
  
  return (
    <>

      <nav className="z-10 flex items-center justify-between bg-gray-800 bg-opacity-95 py-3 sm:px-20 flex-wrap  sticky top-0 right-0 left-0">
        <div className='flex items-center'>
          <a href="#" className="p-2 mr-4 inline-flex items-center">
            <i className="fa-solid fa-cart-arrow-down fa-xl text-green-500 p-3 mt-1"></i>
            <span className="text-2xl text-green-500 font-bold  tracking-wide">FreshCart</span>
          </a>
          {userToken && <div>
            <div className={isOpen ? "top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto" : " top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto hidden"} id="navigation">
              <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                <NavLink to={"/"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Home </NavLink>
                <NavLink to={"/products"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Products </NavLink>
                <NavLink to={"/categories"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Categories </NavLink>
                <NavLink to={"/brands"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Brands </NavLink>
                <NavLink to={"/wishlist"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Wish list </NavLink>
                <NavLink to={"/cart"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Cart </NavLink>
              </div>
            </div>

          </div>}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler" data-target="#navigation" >
          <i className="material-icons">menu</i>
        </button>
        <div className='flex items-center gap-4 media-icon text-gray-200  justify-center w-full lg:w-auto'>
          <i className="fa-brands cursor-pointer hover:text-green-400 fa-facebook-f "></i>
          <i className="fa-brands cursor-pointer hover:text-green-400 fa-twitter "></i>
          <i className="fa-brands cursor-pointer hover:text-green-400 fa-linkedin "></i>
          <i className="fa-brands cursor-pointer hover:text-green-400 fa-youtube "></i>
          <i className="fa-brands cursor-pointer hover:text-green-400 fa-tiktok "></i>

          <div>
            {!userToken && <>
              <NavLink to={"/login"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Login </NavLink>
              <NavLink to={"/register"} className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Register </NavLink>
            </>}
            {userToken && <button onClick={Signout}  className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:underline" > Signout </button>}
          </div>

        </div>

      </nav>

    </>
  )
}

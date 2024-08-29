import axios from "axios";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";


export async function addProductToCart(productId) {
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
        productId: productId,
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    // console.log(data);
    toast.success(data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });

}

// const [products, setProducts] = useState([])
// export async function getProducts(params) {
//     // setIsloading(true)
//     const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
//     setProducts(data.data)
//     setIsloading(false)
//     console.log(data.data);    
//   }
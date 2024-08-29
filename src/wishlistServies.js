import axios from "axios";
import { Bounce, toast } from "react-toastify";

export async function addProductToWishlist(productId) {
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
        productId: productId
    }, {
        headers: {
            token: localStorage.getItem("token")
        }
    })
    toast.success("product has been add to wishlist", {
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
import {useAuth} from "../context/AuthContext.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useCart} from "../context/CartContext.jsx";


export const CartPage = () => {
    const {cart, updateQuantity, removeFromCart, loading} = useCart();
    const navigate = useNavigate();

    const calculateTotal = () =>
        cart?.items?.reduce(
            (sum, i) => sum + (i.product.price) * i.quantity,
            0
        ) ?? 0;



    if (loading) {
        return (
            <div className={"text-center text-white mt-10"}>Loading your cart....</div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className={"text-center text-white mt-25"}>
                <h2 className={"text-2xl font-bold mb-3"}>Your cart is empty.</h2>
                <button
                    onClick={() => navigate("/widgets")} className={"bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"}>
                    Browse Widgets
                </button>
            </div>
        );
    }
    return(
        <div className={"min-h-screen bg-gray-800 text-white p-6 pt-24"}>
            <h1 className={"text-3xl font-bold text-orange-400 mb-6 text-center"}>
             Shopping Cart
            </h1>

            <div className={"max-w-5xl mx-auto"}>
                {cart.items.map((item) => (
                    <div key={item.cartItemId}
                         className={"flex flex-col sm:flex-row items-center justify-between bg-gray-700 rounded-lg shadow-md p-4 mb-4"}
                    >
                        <div className={"flex items-center space-x-4"}>
                            <img src={item.product.imageUrl} alt={item.product.name}
                                 className={"h-20 w-20 rounded object-cover"}/>
                        <div>
                            <h2 className={"text-lg font-semibold"}>
                                {item.product.name}
                            </h2>
                            <p className={"text-sm text-gray-300"}>
                                {item.color?.colorLabel || "Default Color"}
                            </p>
                            <p className={"text-sm text-gray-400"}>
                                ${item.product.price.toFixed(2)}
                            </p>
                        </div>
                    </div>

                    <div className={"absolute left-2/5 space-x-3 mt-3 sm:mt-0"}>
                        <input type="number"
                               defaultValue={item.quantity}
                               min={"1"}
                               onBlur={(e) =>
                                   updateQuantity(item.cartItemId, parseInt(e.target.value))
                               }
                               className={"w-16 text-center rounded bg-gray-600 border border-gray-500 focus:border-orange-400 focus:outline-none"}
                        />
                    </div>


                    <div className={"flex items-center space-x-3 mt-3 sm:mt-0"}>
                        <p>
                            ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className={"bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded"}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <div className={"flex justify-end mt-6 text-xl font-semibold"}>
                Total:{" "}
                <span className={"text-orange-400 ml-2"}>
                        ${calculateTotal().toFixed(2)}
                </span>
            </div>

            <div className={"flex justify-end mt-4"}>
                <button
                    onClick={() => alert("Checkout flow not yet implemented")}
                    className={"bg-green-600 hover:bg-green-700 px-6 py-2 rounded text-white font-semibold"}
                >
                    Checkout
                </button>
            </div>

        </div>
    </div>
)
}
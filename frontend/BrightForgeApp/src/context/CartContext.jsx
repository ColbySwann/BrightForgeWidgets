import {createContext, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext.jsx";
import api from "../api/axiosInstance.js";


const CartContext = createContext();

export const CartProvider = ({children}) => {
    const {user} = useAuth();
    const [cart, setCart] = useState({items: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!user) {
            setCart({ items: [] });
        } else {
            fetchCart();
        }
    }, [user]);


    const fetchCart = async () => {
        try {
            setLoading(true);
            const res = await api.get(`http://localhost:8080/api/cart/${user.id}`);
            setCart(res.data);
        } catch (err) {
            console.error("Error fetching cart", err);
        } finally {
            setLoading(false);
        }
    }

    const addToCart = async (productId, colorId, quantity = 1) => {
        try {
            const userId = Number(user.id);
            const pid = Number(productId);
            const cid = Number(colorId);
            const qty = Number(quantity);
            const res = await api.post(`http://localhost:8080/api/cart/${userId}/add`, {
                productId: pid,
                colorId: cid,
                quantity: qty
                }
            );
            setCart(res.data)
        }catch (err) {
            console.error("Error adding to cart: ", err);
        }
    }

    const updateQuantity = async (cartItemId, newQty) => {
        try {
            const userId = Number(user?.id);
            if (!userId || !cartItemId) {
                console.error("Missing user or cart item ID");
                return;
            }

            const res = await api.put(
                `http://localhost:8080/api/cart/${userId}/update/${Number(cartItemId)}`,
                { quantity: newQty }
            );

            setCart(res.data);
        } catch (err) {
            console.error("Error updating quantity:", err);

            if (err.response?.status === 400 && err.response?.data?.message) {
                alert(err.response.data.message); // later replace with toast
            } else if (err.response?.status === 403) {
                alert("You are not authorized to perform this action.");
            } else {
                alert("Something went wrong while updating your cart.");
            }
        }
    };


    const removeFromCart = async (cartItemId) => {
        try {
            const cid = Number(cartItemId);
            const userId = Number(user.id);
            const res = await api.delete(
                `http://localhost:8080/api/cart/${userId}/remove/${cid}`
            );
            setCart((prev) => ({
                ...prev, items: prev.items.filter((i) => i.cartItemId !== cartItemId),
            }));
        }catch (err) {
            console.error("Error removing item:", err);
        }
    };

    return(
        <CartContext.Provider
            value={{
                cart,
                loading,
                addToCart,
                updateQuantity,
                removeFromCart,
                fetchCart,
            }}
            >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

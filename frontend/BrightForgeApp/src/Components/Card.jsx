import React, {useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {useCart} from "../context/CartContext.jsx";
import axios from "axios";

const Card = ({ product, onEdit, onDelete, showAdminControls, onHandleRefresh }) => {
    const [flipped, setFlipped] = useState(false);
    const [colors, setColors] = useState([]);
    const { isAdmin } = useAuth();
    const {addToCart} = useCart();

    const imageSrc =
        product.imageUrl && product.imageUrl.trim() !== ""
            ? product.imageUrl
            : "https://via.placeholder.com/200x200?text=No+Image";

    const handleFlip = (e) => {
        e.stopPropagation();
        setFlipped((prev) => !prev);
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/color")
            .then(res => setColors(res.data))
    }, []);

    return (
        <div className="relative w-full h-96 [perspective:1200px] transition-all duration-300 hover:[perspective:1500px]">
            <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${
                    flipped ? "[transform:rotateY(180deg)]" : ""
                }`}
            >
                {/* Front */}
                <div className="absolute inset-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:-translate-y-1 p-4 [backface-visibility:hidden] flex flex-col justify-between">
                    {/* Image */}
                    <div className="w-full min-h-24 h-36 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={imageSrc} alt={product.name} className="object-cover w-fit h-full" />
                    </div>

                    {/* Info */}
                    <div className="mt-3">
                        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>

                        <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Color:</span>
                                <div
                                    className="w-4 h-4 rounded-full border border-gray-300"
                                    style={{ backgroundColor: product.color?.colorHex || "gray" }}
                                ></div>
                            </div>
                            <span className="text-orange-600 font-semibold">
                                QTY: {product.qty?.toString() || "0"}
                            </span>
                        </div>

                        <div className="flex justify-between items-center mt-3 pb-0 mb-0">
                            {product.usefulnessRating && (
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < product.usefulnessRating ? "text-red-600" : "text-gray-300"
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M13.91,6.75c-1.17,2.25-4.3,5.31-6.07,6.94c-0.1903,0.1718-0.4797,0.1718-0.67,0C5.39,12.06,2.26,9,1.09,6.75&#xA;&#x9;C-1.48,1.8,5-1.5,7.5,3.45C10-1.5,16.48,1.8,13.91,6.75z"/>
                                        </svg>
                                    ))}
                                </div>
                            )}
                            <span className="text-orange-600 font-semibold">
                                ${product.price?.toString() || "0"}
                            </span>
                        </div>

                    </div>



                    <button onClick={async (e) => {
                        e.stopPropagation();
                        await addToCart(Number(product.id), Number(product.color?.colorId), 1);
                        setTimeout(() => {onHandleRefresh();}, 100);
                    }}
                        className={"bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-md mt-2 active:bg-green-800 active:shadow-inner active:translate-y-px"}>
                        Add to Cart
                    </button>


                    {/* Admin & Flip Button */}
                    {showAdminControls && isAdmin && (
                        <div className="absolute top-86 right-65 flex gap-2 z-10">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit && onEdit(product.id);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-md"
                            >
                                Edit
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete && onDelete(product);
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md"
                            >
                                Delete
                            </button>
                        </div>
                    )}

                    <div className="flex justify-end mt-3">
                        <button
                            onClick={handleFlip}
                            className="bg-orange-600 hover:bg-orange-700 text-white text-xs px-3 py-1 rounded-md"
                        >
                            More Info
                        </button>
                    </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 bg-orange-600 text-white rounded-xl shadow-md p-4 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col justify-between items-center text-center">
                    <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                    <p className="text-sm mb-4">{product.blurb}</p>
                    <p className="text-sm">
                        Status: {product.lifecycleStatus?.description || "Active"}
                    </p>
                    <p>
            <span
                className={`font-semibold ${
                    product.qty > 0 ? "text-green-300" : "text-red-300"
                }`}
            >
              QTY: {product.qty}
            </span>
                    </p>
                    <button
                        onClick={handleFlip}
                        className="mt-3 bg-white text-orange-600 px-3 py-1 rounded-md text-sm font-semibold hover:bg-gray-200"
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
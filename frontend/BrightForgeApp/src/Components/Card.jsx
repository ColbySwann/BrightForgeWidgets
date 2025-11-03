import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import {useCart} from "../context/CartContext.jsx";
import api from "../api/axiosInstance.js";
import axios from "axios";

const Card = ({ product, onEdit, onDelete, showAdminControls, onHandleRefresh }) => {
    const [flipped, setFlipped] = useState(false);
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
                    <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        <img src={imageSrc} alt={product.name} className="object-cover w-full h-full" />
                    </div>

                    {/* Info */}
                    <div className="mt-3">
                        <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.blurb}</p>

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

                        <div className="flex justify-between items-center mt-3">
                            {product.usefulnessRating && (
                                <div className="flex items-center mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-4 h-4 ${
                                                i < product.usefulnessRating ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.182c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.922-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.785.57-1.84-.196-1.54-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.402c-.783-.57-.38-1.81.588-1.81h4.182a1 1 0 00.95-.69l1.286-3.975z" />
                                        </svg>
                                    ))}
                                </div>
                            )}
                            <span className="text-orange-600 font-semibold">
                                Price: ${product.price?.toString() || "0"}
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
                        <div className="absolute top-86 right-25 flex gap-2 z-10">
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
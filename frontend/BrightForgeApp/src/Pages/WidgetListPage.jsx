import React, { useEffect, useState } from "react";
import Card from "../Components/Card.jsx";
import axios from "axios";
import api from "../api/axiosInstance.js";

const WidgetListPage = () => {
    const [products, setProducts] = useState([]);
    const [filterColor, setFilterColor] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [colors, setColors] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8080/api/products")
            // .then(res => console.log(res.data))
            .then(res => setProducts(res.data))
            .catch((err) => console.error("Error fetching products:", err));
        axios.get("http://localhost:8080/api/color")
            .then(res => setColors(res.data))
            .catch((err) => console.error("Error fetching Colors", err));
    }, []);

    const filteredProducts = products
        .filter((w) => w.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((w) => !filterColor || w.color.colorLabel?.toLowerCase() === filterColor.toLowerCase());



    return (
        <div className="relative top-20 left-1/16 p-6 max-w-10/12 bg-gray-700 min-h-screen overscroll-contain">
            {/* 🔍 Search + Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-1/3 mb-3 sm:mb-0 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                />

                {/* Color Filter Buttons */}
                <div className="flex items-center space-x-2">
                    {colors.map(c => (
                        <button key={c.colorId}
                                onClick={() => setFilterColor(c.colorLabel)}
                                className={"px-3 py-1 rounded text-white border-orange-300 border-1 transition"}
                                style={{ backgroundColor: c.colorHex || c.colorCode}}
                        >{c.colorLabel}</button>))}
                    <button
                        onClick={() => setFilterColor("")}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                        Clear Filters
                    </button>
                </div>
            </div>

            {/* Widget Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <Card key={product.id} product={product} onEdit={() => handleEdit(product)} onDelete ={() => handleDelete(product.id)} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-700 mt-6">
                    No results found. Try a different search or clear filters.
                </p>
            )}
        </div>
    );
};

export default WidgetListPage;

import React, { useEffect, useState } from "react";
import Card from "../Components/Card.jsx";

const WidgetListPage = () => {
    const [widgets, setWidgets] = useState([]);
    const [filterColor, setFilterColor] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    // ✅ Fetch all widgets from backend (Spring Boot)
    useEffect(() => {
        fetch("http://localhost:8080/api/widgets")
            .then((res) => res.json())
            .then(setWidgets)
            .catch((err) => console.error("Error fetching widgets:", err));
    }, []);

    // ✅ Filtering logic
    const filteredWidgets = widgets
        .filter((w) => w.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter((w) => !filterColor || w.color?.toLowerCase() === filterColor.toLowerCase());

    return (
        <div className="relative top-20 left-1/16 p-6 max-w-10/12 bg-orange-400/75 min-h-screen overscroll-contain">
            {/* 🔍 Search + Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search widgets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-1/3 mb-3 sm:mb-0 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                />

                {/* Color Filter Buttons */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => setFilterColor("")}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                    >
                        Clear Filters
                    </button>
                    <button
                        onClick={() => setFilterColor("Red")}
                        className={`px-3 py-1 rounded text-white transition ${
                            filterColor === "Red" ? "bg-red-700" : "bg-red-500 hover:bg-red-600"
                        }`}
                    >
                        Red
                    </button>
                    <button
                        onClick={() => setFilterColor("Blue")}
                        className={`px-3 py-1 rounded text-white transition ${
                            filterColor === "Blue" ? "bg-blue-700" : "bg-blue-500 hover:bg-blue-600"
                        }`}
                    >
                        Blue
                    </button>
                </div>
            </div>

            {/* 🧱 Widget Grid */}
            {filteredWidgets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredWidgets.map((widget) => (
                        <Card key={widget.id} widget={widget} />
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

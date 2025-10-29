import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/images/Icon-Only-White.png";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { user, isAdmin, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        if (logout) logout();
        navigate("/");
    };

    const handleSearch = (evt) => {
        evt.preventDefault();
        if (searchTerm.trim() !== "") {
            navigate(`/widgets?search=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
            setIsOpen(false);
        }
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Widgets", path: "/widgets" },
        { name: "About", path: "/about" },
        ...(isAdmin ? [{ name: "Admin", path: "/admin" }] : []),
    ];

    return (
        <nav className="bg-orange-600 text-white shadow-lg fixed top-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo + Brand */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img
                            src={Logo}
                            alt="BrightForge Logo"
                            className="h-10 w-10 nav_logo"
                        />
                        <span className="font-bold text-xl text-gray-100">
              BrightForge
            </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-6">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `hover:text-gray-800 transition ${
                                        isActive
                                            ? "text-gray-900 font-semibold"
                                            : "text-orange-200"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        {/* Search Box */}
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search widgets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-gray-800 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-200 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                                    />
                                </svg>
                            </button>
                        </form>

                        {/* Auth Button */}
                        {user ? (
                            <button
                                onClick={handleLogout}
                                className="bg-gray-900 text-orange-400 font-semibold px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className={"grid grid-cols-2 gap-2"}>
                            <Link
                                to="/login"
                                className="bg-gray-900 text-orange-400 font-semibold px-6 py-2 rounded-lg hover:bg-gray-800 w-full"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="bg-gray-900 text-orange-400 font-semibold px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                Sign Up
                            </Link>
                            </div>
                        )}

                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-300 hover:text-orange-400 focus:outline-none"
                        >
                            {isOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16m0 6H4"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="lg:hidden flex flex-col space-y-2 py-4">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={({ isActive }) =>
                                    `block text-lg ${
                                        isActive
                                            ? "text-gray-900 font-semibold"
                                            : "text-orange-200 hover:text-gray-800"
                                    }`
                                }
                            >
                                {link.name}
                            </NavLink>
                        ))}

                        <form
                            onSubmit={handleSearch}
                            className="relative flex items-center mt-2"
                        >
                            <input
                                type="text"
                                placeholder="Search widgets..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-grow bg-gray-800 text-sm rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 text-gray-200 placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 text-gray-400 hover:text-orange-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
                                    />
                                </svg>
                            </button>
                        </form>

                        {user ? (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setIsOpen(false);
                                }}
                                className="mt-3 bg-gray-900 text-orange-400 font-semibold px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="mt-3 bg-gray-900 text-orange-400 font-semibold px-4 py-2 rounded-lg hover:bg-gray-800"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;

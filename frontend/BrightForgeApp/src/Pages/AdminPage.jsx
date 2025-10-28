import React, { useEffect, useState } from "react";
import widgetForm from "../Components/WidgetForm.jsx";
import {createWidget, getWidgets } from "../services/widgetService";
import WidgetForm from "../Components/WidgetForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Card from "../Components/Card.jsx";

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        description: "",
        qty: "",
        color: "",
        rating: "",
        lifecycleStatus: "",
        imageUrl: "",
    })


    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then(setProducts)
            .catch(console.error);
    }, []);

    const handleEdit = async () => {

    }


    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/products/${id}`, { method: "DELETE"})
            .then(() => setProducts(products.filter((w) => w.id !== id)))
            .catch(console.error)
    };


    return(
        <div className={"relative top-15 min-h-screen bg-gray-800 text-white p-6 overscroll-auto"}>
            <h1 className={"text-3xl font-bold text-orange-400 mb-6 text-center"}>
                Admin Dashboard
            </h1>

            <WidgetForm  />

            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10"}>
                {products.map((products) => (
                    <div key={products.id} className={"relative"}>
                        <Card product={products} onEdit={() => handleEdit()} onDelete={() => handleDelete(products.id)} />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminPage;
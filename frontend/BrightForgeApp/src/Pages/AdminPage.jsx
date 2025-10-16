import React, { useEffect, useState } from "react";
import widgetForm from "../Components/WidgetForm.jsx";
import {createWidget, getWidgets } from "../services/widgetService";
import WidgetForm from "../Components/WidgetForm.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import Card from "../Components/Card.jsx";

const AdminPage = () => {
    const {user} = useAuth();
    const [widgets, setWidgets] = useState([]);
    const [newWidget, setNewWidget] = useState({name: "",
        description: "",
        price: "",
        color: "",
        quantity: "",
        imageUrl: ""})


    useEffect(() => {
        fetch("http://localhost:8080/api/widgets")
            .then((res) => res.json())
            .then(setWidgets)
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setNewWidget({...newWidget, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8080/api/widgets", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(newWidget),
        })
            .then((res) => res.json())
            .then((data) => {
                setWidgets([...widgets, data]);
                setNewWidget({name: "",
                    description: "",
                    price: "",
                    color: "",
                    quantity: "",
                    imageUrl: ""});
            })
            .catch(console.error);
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/widgets/${id}`, { method: "DELETE"})
            .then(() => setWidgets(widgets.filter((w) => w.id !== id)))
            .catch(console.error)
    };


    return(
        <div className={"relative top-15 min-h-screen bg-gray-900 text-white p-6 overscroll-auto"}>
            <h1 className={"text-3xl font-bold text-orange-400 mb-6 text-center"}>
                Admin Dashboard
            </h1>

            <WidgetForm onSubmit={handleCreate} />

            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
                {widgets.map((widgets) => (
                    <div key={widgets.id} className={"relative"}>
                        <Card widget={widgets} />
                        <button
                            onClick={() => handleDelete(widgets.id)}
                            className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            {/*<div className={"mt-10"}>*/}
            {/*    <h2 className={"text-2xl font-semibold mb-4"}>Existing Widgets</h2>*/}
            {/*    <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>*/}
            {/*        {widgets.map((widget) => (*/}
            {/*            <div key={widget.id} className={"bg-gray-800 rounded-xl p-4 shadow-md"}>*/}
            {/*                <img*/}
            {/*                    src={widget.imageUrl || "/placeholder.png"}*/}
            {/*                    alt={widget.name}*/}
            {/*                    className={"rounded-md h-40 w-full object-cover mb-3"}*/}
            {/*                />*/}
            {/*                <h3 className={"font-bold text-lg"}>{widget.name}</h3>*/}
            {/*                <p className={"text-sm text-gray-300"}>{widget.description}</p>*/}
            {/*                <p className={"text-orange-400 font-semibold mt-2"}>*/}
            {/*                    ${widget.price} - {widget.quantity} in stock*/}
            {/*                </p>*/}
            {/*            </div>*/}
            {/*        ))}*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    );
};

export default AdminPage;
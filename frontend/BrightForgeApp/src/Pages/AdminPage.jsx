import React, { useEffect, useState } from "react";
import WidgetForm from "../Components/WidgetForm.jsx";
import Card from "../Components/Card.jsx";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

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
    const [shouldRefresh, setShouldRefresh] = useState(false);
    
    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`)
    }

    const handleDelete = async (id) => {
        if (confirm("Are you sure you want to delete this product")){
            try {
                await axios.delete(`http://localhost:8080/api/products/${id}`);
                alert("Product Deleted!")
            }catch (err) {
                console.error(err)
                alert("Failed to delete product")
            }
        }
    };

    const handleFormSubmissionSuccess = () => {
        setShouldRefresh(prev => !prev);
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/products")
            .then((res) => res.json())
            .then(setProducts)
            .catch(console.error);
    }, [shouldRefresh]);



    return(
        <div className={"relative top-15 min-h-screen bg-gray-800 text-white p-6 overscroll-auto"}>
            <h1 className={"text-3xl font-bold text-orange-400 mb-6 text-center"}>
                Admin Dashboard
            </h1>

            <WidgetForm onSubmissionSuccess = {handleFormSubmissionSuccess} />

            <div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10"}>
                {products.map((products) => (
                    <div key={products.id} className={"relative"}>
                        {console.log(products)}
                        <Card showAdminControls={true} product={products} onEdit={handleEdit} onDelete={() => handleDelete(products.id)} />
                    </div>
                ))}
            </div>

        </div>
    );
};

export default AdminPage;
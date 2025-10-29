import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import Card from "../Components/Card.jsx";

const productEditSchema = yup.object().shape(
    {
        name: yup
            .string()
            .required("Product must have a name"),
        description: yup
            .string()
            .required("Product must have a description")
            .max(200, "Description must be under 200 characters"),
        qty: yup
            .number()
            .typeError("Quantity must be a number")
            .required("Product must have a quantity, even a negative number"),
        color: yup
            .number()
            .required("Products must have a color"),
        rating: yup
            .number()
            .required("Product must have at least a one star rating")
            .min(1),
        lifecycleStatus: yup
            .number()
            .required("Status is required")
            .max(5),
        imageUrl: yup
            .string()
            .nullable()
    }
)

export const EditWidgetPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [colors, setColors] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState: {errors, isSubmitting},} = useForm({
        resolver: yupResolver(productEditSchema),
        defaultValues: {

        }
    })

    useEffect(() => {
        async function fetchProductDetails() {
            try {
                const res = await axios.get(`http://localhost:8080/api/products/${id}`);
                setProduct(res.data);
                axios.get("http://localhost:8080/api/color")
                    .then(res => setColors(res.data))
                axios.get("http://localhost:8080/api/lifecycleStatus")
                    .then(res => setStatuses(res.data));
            } catch (err) {
                console.error("Error fetching product:", err);
            }
        }
        fetchProductDetails();
    }, [id]);

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                description: product.blurb,
                qty: product.qty,
                color: product.color?.colorId,
                rating: product.usefulnessRating,
                lifecycleStatus: product.lifecycleStatus?.lifecycleStatusId,
                imageUrl: product.imageUrl,
            });
        }
    }, [product, reset]);

    const onSubmit = async (data) => {
        console.log("Submitting:", data);
        try {
            let imageUrl = product.imageUrl || null;
            let slug = product.slug || null;

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const uploadRes = await axios.post("http://localhost:8080/api/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imageUrl = uploadRes.data;
            }

            const productData = {
                name: data.name,
                blurb: data.description,
                slug,
                qty: data.qty,
                color: { colorId: data.color },
                lifecycleStatus: { lifecycleStatusId: data.lifecycleStatus },
                imageUrl,
                usefulnessRating: data.rating,
            };

            await axios.put(`http://localhost:8080/api/products/${id}`, productData);
            alert("Product Updated!");
        } catch (err) {
            console.error("Error updating product:", err);
            alert("Error updating Product");
        }
        navigate("/admin")
    };

    if (!product) {
        return (
            <div className={ "text-white text-center p-10"}>
                <h2>Loading product details....</h2>
            </div>
        )
    }


    return (
        <div className={"w-full h-screen bg-gray-800 text-white"}>
            <div className={" flex flex-col lg:flex-row lg:space-x-8 items-start justify-center max-w-6xl mx-auto mt-15 p-6 "}>
                <div className={"w-full lg:w-1/2 mb-6 lg:mb-0"}>
                    <Card product={product} />
                </div>
                <div className={"w-full lg:w-1/2"}>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className={"bg-gray-600 text-white rounded-xl p-6 shadow-lg max-w-lg mx-auto space-y-4"}
                    >
                        <h2 className={"text-2xl font-bold text-orange-400 mb-4"}>
                            Edit Widget
                        </h2>

                        <div>
                            <label className={"block text-sm mb-1"}>Name</label>
                            <input {...register("name")}
                                   defaultValue={product.name}
                                   className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                            {errors.name && (
                                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={"block text-sm mb-1"}>Description</label>
                            <textarea
                                {...register("description")}
                                defaultValue={product.description}
                                rows={3}
                                className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                            {errors.description && (
                                <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={"block text-sm mb-1"}>Quantity</label>
                            <input
                                type={"number"}
                                {...register("qty")}
                                defaultValue={product.qty}
                                className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                            {errors.qty && (
                                <p className="text-red-400 text-sm mt-1">{errors.qty.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={"block text-sm mb-1"}>Rating</label>
                            <input
                                type={"number"}
                                {...register("rating")}
                                defaultValue={product.usefulnessRating}
                                className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                            {errors.rating && (
                                <p className="text-red-400 text-sm mt-1">{errors.rating.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={"block text-sm mb-1"}>Color</label>
                            <select
                                {...register("color")}
                                defaultValue={product.color}
                                className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}>
                                <option value="">Select a Color</option>
                                {colors.map(c => (
                                    <option key={c.colorId} value={c.colorId}>{c.colorLabel}</option>
                                ))}
                            </select>
                            {errors.color && (
                                <p className="text-red-400 text-sm mt-1">{errors.color.message}</p>
                            )}
                        </div>

                        <div>
                            <label className={"block text-sm mb-1"}>Lifecycle Status</label>
                            <select
                                type={"number"}
                                {...register("lifecycleStatus")}
                                defaultValue={product.lifecycleStatus}
                                className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}>
                                <option value="">Select a Status</option>
                                {statuses.map(s => (
                                    <option key={s.lifecycleStatusId} value={s.lifecycleStatusId}>{s.description}</option>
                                ))}
                            </select>
                            {errors.lifecycleStatus && (
                                <p className="text-red-400 text-sm mt-1">{errors.lifecycleStatus.message}</p>
                            )}
                        </div>

                        <div>
                            <input
                                type="file"
                                accept={"image/*"}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setImageFile(file);
                                    setPreview(URL.createObjectURL(file));
                                }}
                                className={"bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-1 py-2 rounded-sm w-1/2"}
                            />
                            {preview && <img src={preview} alt={"Preview"} className={"mt-2 h-32 object-cover rounded"} /> }
                        </div>

                        <button
                            type={"submit"}
                            disabled={isSubmitting}
                            onClick={handleSubmit(onSubmit)}
                            className={"bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-4 py-2 rounded-lg w-full disabled:opacity-50"}
                        >
                            {isSubmitting ? "Saving..." : "Save Widget"}
                        </button>
                    </form>
                </div>

            </div>
        </div>

    )
}
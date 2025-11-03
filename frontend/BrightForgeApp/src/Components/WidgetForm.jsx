import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

const widgetSchema = yup.object().shape({
    name: yup
        .string()
        .required("Widget name is required"),
    description: yup
        .string()
        .required("Description is required")
        .max(200, "Description must be under 200 characters"),
    qty: yup
        .number()
        .typeError("Quantity mut be a number")
        .required("Quantity is required"),
    price: yup
        .number()
        .min(0)
        .typeError("Price must be a number")
        .required("Price is required"),
    color: yup
        .number()
        .required("Color is required"),
    lifecycleStatus: yup
        .number()
        .required("Status is required"),
    imageUrl: yup
        .string()
        // .url("Must be a valid URL")
        // .required("Image URL is required"),
});

const WidgetForm = ({onSubmissionSuccess}) => {
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [colors, setColors] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const {register, handleSubmit, reset, formState: {errors, isSubmitting},} = useForm({
        resolver: yupResolver(widgetSchema),
        defaultValues: {
            name: "",
            description: "",
            qty: "",
            price: "",
            color: "",
            lifecycleStatus: "",
            imageUrl: "",
        },
    });

    useEffect(() => {
        axios.get("http://localhost:8080/api/color")
            .then(res => setColors(res.data))
        axios.get("http://localhost:8080/api/lifecycleStatus")
            .then(res => setStatuses(res.data));
    }, []);

    const onSubmit = async (data) => {
        console.log(data)
        try {
            let imageUrl = null;

            if (imageFile) {
                const formData = new FormData();
                formData.append("file", imageFile);
                const uploadRes = await axios.post("http://localhost:8080/api/upload", formData, {
                    headers: {"Content-Type": "multipart/form-data"}
                });
                imageUrl = uploadRes.data;
                console.log(uploadRes.data)
            }

            const widgetData = {
                name: data.name,
                blurb: data.description,
                qty: data.qty,
                price: data.price,
                color: {colorId: data.color},
                lifecycleStatus: {lifecycleStatusId: data.lifecycleStatus},
                imageUrl: imageUrl
            };

            await axios.post("http://localhost:8080/api/products", widgetData);
            reset();
            setImageFile(null);
            setPreview(null);
            alert("Widget added successfully!");
            onSubmissionSuccess();
        }catch (err) {
            console.error(err);
            alert("Error adding widget");
        }
    };





    return(
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={"bg-gray-600 text-white rounded-xl p-6 shadow-lg max-w-lg mx-auto space-y-4"}
            >
            <h2 className={"text-2xl font-bold text-orange-400 mb-4"}>
                Add New Widget
            </h2>

            <div>
                <label className={"block text-sm mb-1"}>Name</label>
                <input {...register("name")}
                className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
            </div>

            <div>
                <label className={"block text-sm mb-1"}>Description</label>
                <textarea
                    {...register("description")}
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
                    className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.qty && (
                    <p className="text-red-400 text-sm mt-1">{errors.qty.message}</p>
                )}
            </div>

            <div>
                <label className={"block text-sm mb-1"}>Price</label>
                <input
                    type={"number"}
                    {...register("price")}
                    step={"0.01"}
                    className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.price && (
                    <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
                )}
            </div>

            <div>
                <label className={"block text-sm mb-1"}>Color</label>
                <select
                    {...register("color")}
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
                {isSubmitting ? "Saving..." : "Add Widget"}
            </button>
        </form>
    );
};

export default WidgetForm;

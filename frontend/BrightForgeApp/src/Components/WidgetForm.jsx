import React from "react";
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/src/index.js";
import * as yup from "yup";

const widgetSchema = yup.object().shape({
    name: yup
        .string()
        .required("Widget name is required"),
    description: yup
        .string()
        .required("Description is required")
        .max(200, "Description must be under 200 characters"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .positive("Price must be greater than 0")
        .required("Price is required"),
    color: yup
        .string()
        .required("Color is required"),
    quantity: yup
        .number()
        .typeError("Quantity must be a number")
        .required("Quantity is required"),
    imageUrl: yup
        .string()
        .url("Must be a valid URL")
        .required("Image URL is required"),
});

const WidgetForm = ({ onSubmit }) => {
    const {register, handleSubmit, reset, formState: {errors, isSubmitting},} = useForm({
        resolver: yupResolver(widgetSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
            color: "",
            quantity: "",
            imageUrl: "",
        },
    });

    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
    };

    return(
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={"bg-gray-800 text-white rounded-xl p-6 shadow-lg max-w-lg mx-auto space-y-4"}
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
                <label className={"block text-sm mb-1"}>Price</label>
                <input
                    type={"number"}
                    {...register("price")}
                    className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.price && (
                    <p className="text-red-400 text-sm mt-1">{errors.price.message}</p>
                )}
            </div>

            <div>
                <label className={"block text-sm mb-1"}>Color</label>
                <input
                    {...register("color")}
                    className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.color && (
                    <p className="text-red-400 text-sm mt-1">{errors.color.message}</p>
                )}
            </div>

            <div>
                <label className={"block text-sm mb-1"}>Quantity</label>
                <input
                    type={"number"}
                    {...register("name")}
                    className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.quantity && (
                    <p className="text-red-400 text-sm mt-1">{errors.quantity.message}</p>
                )}
            </div>

            <div>
                <label className={"block text-sm mb-1"}>Image URL</label>
                <input
                    {...register("imageUrl")}
                    className={"w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-orange-400 outline-none"}/>
                {errors.imageUrl && (
                    <p className="text-red-400 text-sm mt-1">{errors.imageUrl.message}</p>
                )}
            </div>

            <button
                type={"submit"}
                disabled={isSubmitting}
                className={"bg-orange-500 hover:bg-orange-600 transition text-white font-semibold px-4 py-2 rounded-lg w-full disabled:opacity-50"}
            >
                {isSubmitting ? "Saving..." : "Add Widget"}
            </button>
        </form>
    );
};

export default WidgetForm;

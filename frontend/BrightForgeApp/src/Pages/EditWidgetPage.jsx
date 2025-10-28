import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from "axios";

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
            .required("Status is required"),
        imageUrl: yup
            .string()
    }
)

export const EditWidgetPage = ({id}) => {
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [colors, setColors] = useState([]);
    const [statuses, setStatuses] = useState([]);

    const {register, handleSubmit, reset, formState: {errors, isSubmitting},} = useForm({
        resolver: yupResolver(productEditSchema),
        defaultValues: {

        }
    })
handleSubmit()
    try {
        const payload = {
            name: form.name,
            description: form.description,
            qty: form.qty,
            color: form.color,
            rating: form.rating,
            lifecycleStatus: form.lifecycleStatus,
            imageUrl: form.imageUrl,
        }
    }catch (err) {
        console.error(err);
    }


}
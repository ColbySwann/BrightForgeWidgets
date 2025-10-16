import axios from "axios";

const API_URL = "http://localhost:8080/api/widgets";

export const createWidget = async (widget) => {
    return await axios.post(API_URL, widget);
};

export const getWidgets = async () => {
    return await axios.get(API_URL);
}
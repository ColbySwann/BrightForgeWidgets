import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children }) {
    const role = localStorage.getItem("role");
    if (role!== "ADMIN") return <Navigate to="/splash" replace />;
    return children
};

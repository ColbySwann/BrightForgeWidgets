import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const role = localStorage.getItem("role");
    if (role!== "ADMIN") return <Navigate to="/splash" replace />;
    return children
};

import {createContext, useContext, useState, useEffect} from "react";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");
        const id = localStorage.getItem("id");
        if (token && role && id) setUser({token, role, username, id: Number(id)});
    }, []);

    const login = (token, role, username, id) => {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("username", username);
        localStorage.setItem("id", id);
        setUser({token, role, username, id: Number(id)});
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("id");
        setUser(null);
    };

    const isAdmin = user?.role === "ADMIN";

    return (
        <AuthContext.Provider value={{user, login, logout, isAdmin}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
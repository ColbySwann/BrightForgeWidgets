import {useForm} from "react-hook-form";
import { yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../api/axiosInstance.js";
import { useAuth } from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

export default function LoginPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting },
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        try {
            const res = await api.post("http://localhost:8080/api/auth/login", data);

            console.log("Login response: ", res.data);

            const {token, role, username, id} = res.data;

            api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            login(token, role, username, id);

            if (role === "ADMIN") {
                navigate("/admin");
            }else {
                navigate("/");
            }
        } catch (err) {
            console.log(err);
            alert("Invalid credentials");
        }
    };

    return(
        <div className={"flex items-center justify-center min-h-screen bg-gray-900 text-white"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"bg-gray-800 p-8 rounded-xl shadow-lg w-80"}>
                <h2 className={"text-2xl font-bold mb-6 text-center"}>Admin Login</h2>

                <label className={"block mb-2"}>Username</label>
                <input
                    {...register("username")}
                    className={"w-full p-2 mb-2 rounded bg-gray-700 text-white"}/>
                <p className={"text-red-400 text-sm"}>{errors.username?.message}</p>

                <label className={"block mt-4 mb-2"}>Password</label>
                <input
                    {...register("password")}
                    type={"password"}
                    className={"w-full p-2 mb-2 rounded bg-gray-700 text-white"}/>
                <p className={"text-red-400 text-sm"}>{errors.password?.message}</p>

                <button
                    type={"submit"}
                    // disabled={"isSubmitting"}
                    className={"w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg"}>
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
            {/*<NavLink to={"/register"} className={"align-middle relative"}>Sign Up</NavLink>*/}
        </div>
    );
}
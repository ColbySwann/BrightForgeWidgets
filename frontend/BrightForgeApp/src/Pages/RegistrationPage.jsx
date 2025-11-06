import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup';
import axios from "axios";
import {useNavigate} from "react-router-dom";

const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Must be a valid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required(),
});

const RegistrationPage = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({resolver: yupResolver(schema)});

    const onSubmit = async (data) => {
        try {
            await axios.post("http://localhost:8080/api/auth/register", {
                username: data.username,
                email: data.email,
                password: data.password,
                role: "ADMIN"
            });
            alert("Registration successful! You can now log in.");
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.error || "Username/Email Already Registered. Please Login Or Enter A New Username/Email");
        }
    };

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className={"bg-gray-800 p-8 rounded-xl shadow-lg w-80"}>
                <h2 className={"text-2xl font-bold mb-6 text-center"}>Admin Registration</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={"space-y-4"}>
                    {/*USERNAME*/}
                    <div>
                        <label className={"block mt-4 mb-2"}>Username</label>
                        <input
                            {...register("username")}
                            className={"w-full p-2 mb-2 rounded bg-gray-700 text-white"}
                        />
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    {/*EMAIL*/}
                    <div>
                        <label className={"block mt-4 mb-2"}>Email</label>
                        <input
                            {...register("email")}
                            type={"email"}
                            className={"w-full p-2 mb-2 rounded bg-gray-700 text-white"}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    {/*PASSWORD*/}
                    <div>
                        <label className={"block mt-4 mb-2"}>Password</label>
                        <input
                            {...register("password")}
                            type={"password"}
                            className={"w-full p-2 mb-2 rounded bg-gray-700 text-white"}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <button
                        type={"submit"}
                        className={"w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition"}
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage;
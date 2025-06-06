import React, { useState, useContext, useEffect } from "react";
import Layout from "../../layout/layout.jsx";
import Api from "../../../Apis/backendApi.js";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context.jsx";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const context = useContext(Context);
    if (!context) {
        console.error("Context not available - check provider");
        return null; 
    }

    const { fetchCurrentUser, setUser } = context;

    const togglePassword = () => setShowPassword((prev) => !prev);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading("Logging in...");

        try {
            const res = await fetch(Api.login.url, {
                method: Api.login.method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setUser(data.user);
            await fetchCurrentUser();

            toast.dismiss(loadingToast);

            if (data.user.role === "ADMIN") {
                navigate("/AdminDashboard");
            } else {
                navigate("/");
            }

            toast.success(data.message || "Login successful");
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error("Login error:", error);
            toast.error(error.message || "Login failed. Please try again.");
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    };

    return (
        <Layout>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Log In to Your Account
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="block mb-1 text-gray-600">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                            <div
                                onClick={togglePassword}
                                className="absolute right-3 top-[38px] cursor-pointer text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-xl"
                        >
                            Log In
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-black font-bold hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    );
}

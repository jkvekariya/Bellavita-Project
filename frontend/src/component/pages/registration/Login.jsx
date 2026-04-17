import React, { useState, useContext } from "react";
import Layout from "../../layout/layout.jsx";
import Api from "../../../Apis/backendApi.js";
import toast from "react-hot-toast";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Context from "../../context/Context.jsx";

export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();

    const context = useContext(Context);
    const { fetchCurrentUser, setUser } = context || {};

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

            if (data.user.role === "ADMIN") {
                localStorage.setItem("adminToken", data.token);
                localStorage.setItem("adminUser", JSON.stringify(data.user));
            }

            if (setUser) setUser(data.user);
            if (fetchCurrentUser) await fetchCurrentUser();

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
            <div className="min-h-screen flex items-center justify-center bg-white font-jost">
                <div className="flex w-full h-screen overflow-hidden">
                    {/* Left Side Image */}
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <img
                            src="/loginimage.png"
                            alt="Login Visual"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/10"></div>
                    </div>

                    {/* Right Side Form */}
                    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
                        {/* Back Button */}
                        <button
                            onClick={() => navigate("/")}
                            className="absolute top-6 right-6 flex items-center gap-2 text-gray-600 hover:text-black transition-colors"
                        >
                            <span className="text-sm font-medium uppercase">Back to Home</span>
                            <i className="fa-solid fa-house"></i>
                        </button>

                        <div className="max-w-md w-full">
                            <h2 className="text-3xl font-bold mb-2 text-gray-900 tracking-tight">
                                Welcome Back
                            </h2>
                            <p className="text-gray-500 mb-8 font-lato text-sm">Please enter your details to sign in.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 font-jost">
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-lato"
                                        />
                                        <i className="fa-solid fa-envelope absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1.5 font-jost">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-lato"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black"
                                        />
                                        <span className="text-sm text-gray-600 group-hover:text-black font-lato">Remember me</span>
                                    </label>
                                    <Link to="/forgot-password" size={18} className="text-sm font-medium text-black hover:underline font-jost">
                                        Forgot Password?
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 rounded-lg transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm shadow-lg shadow-black/10"
                                >
                                    Log In
                                </button>
                            </form>

                            <div className="mt-8 text-center bg-gray-50 py-4 rounded-xl">
                                <p className="text-gray-600 font-lato">
                                    Don't have an account?{" "}
                                    <Link to="/signup" className="text-black font-bold hover:underline font-jost">
                                        Create account
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}



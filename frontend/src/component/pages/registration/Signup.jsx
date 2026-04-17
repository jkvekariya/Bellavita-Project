import React, { useState } from "react";
import Layout from "../../layout/layout";
import Api from "../../../Apis/backendApi.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const loadingToast = toast.loading("Creating account...");
    try {
      const datarasponse = await fetch(Api.signup.url, {
        method: Api.signup.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await datarasponse.json();
      toast.dismiss(loadingToast);

      if (!datarasponse.ok) {
        throw new Error(data.message || "Signup failed");
      }

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Error during signup:", error);
      toast.error(error.message || "Failed to create account");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-white font-jost">
        <div className="flex w-full h-screen overflow-hidden">
          {/* Left Side Image */}
          <div className="hidden lg:block lg:w-1/2 relative">
            <img
              src="/signupimage.jpg"
              alt="Signup Visual"
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

            <div className="max-w-md w-full border-0">
              <h2 className="text-3xl font-bold mb-2 text-gray-900 tracking-tight">
                Create Account
              </h2>
              <p className="text-gray-500 mb-8 font-lato text-sm">Join our premium community today.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1 font-jost">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-lato"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1 font-jost">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-lato"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1 font-jost">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-lato"
                  />
                </div>

                <div>
                  <label htmlFor="cpassword" className="block text-sm font-semibold text-gray-700 mb-1 font-jost">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    id="cpassword"
                    placeholder="••••••••"
                    value={formData.cpassword}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all font-lato"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-3.5 rounded-lg transition-all transform active:scale-[0.98] uppercase tracking-widest text-sm mt-4 shadow-lg shadow-black/10"
                >
                  Sign Up
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 font-lato">
                  Already have an account?{" "}
                  <Link to="/login" className="text-black font-bold hover:underline font-jost">
                    Login
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


import React, { useState } from "react";
import Layout from "../../layout/layout";
import Api from "../../../Apis/backendApi.js";
import { useNavigate } from "react-router-dom";

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
    console.log("Form submitted:", formData);

    if (formData.password === formData.cpassword) {
      try {
        const datarasponse = await fetch(Api.signup.url, {
          method: Api.signup.method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!datarasponse.ok) {
          console.log("Network response was not ok");
        }

        const data = await datarasponse.json();
        console.log("Response data:", data);

        navigate("/login")

      } catch (error) {
        console.error("Error during signup:", error);
      }
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block mb-1 text-gray-600">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-600">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-600">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label htmlFor="cpassword" className="block mb-1 text-gray-600">
                Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-900 text-white font-semibold py-2 rounded-xl transition duration-200"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-black font-bold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

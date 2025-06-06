import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag, FaListUl } from "react-icons/fa";
import ProductDetail from "./ProductDetail";
import OrderDetail from "./OrderDetail";
import UserDetail from "./UserDetail";
import Navbar from "../../../component/navbar/Navbar";

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [admin, setAdmin] = useState({ name: "", email: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      console.log("Admin data from localStorage:", adminData);
      setAdmin(adminData);
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div
        className="flex bg-gray-50"
        style={{ paddingTop: "56px", minHeight: "calc(100vh - 56px)" }}
      >
        <div className="w-64 bg-white shadow-lg p-5 fixed top-0 left-0 bottom-0 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 mt-25 text-center">Admin</h1>

          <div className="py-5 mb-5 text-center border-b">
            <FaUser size={40} className="mx-auto mb-4 text-gray-600" />
          </div>

          <ul className="space-y-4 pt-4">
            <li
              onClick={() => setTabIndex(0)}
              className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${tabIndex === 0
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaShoppingBag /> Products
            </li>
            <li
              onClick={() => setTabIndex(1)}
              className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${tabIndex === 1
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaListUl /> Orders
            </li>
            <li
              onClick={() => setTabIndex(2)}
              className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${tabIndex === 2
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaUser /> Users
            </li>

           

          </ul>
        </div>

        <div className="flex-1 ml-64  overflow-auto">
          <div className="bg-white py-4 px-6 shadow text-center mb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>

          <div className="mt-6">
            {tabIndex === 0 && <ProductDetail />}
            {tabIndex === 1 && <OrderDetail />}
            {tabIndex === 2 && <UserDetail />}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

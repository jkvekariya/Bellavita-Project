import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaShoppingBag, FaListUl, FaQuestionCircle } from "react-icons/fa";
import ProductDetail from "./ProductDetail";
import OrderDetail from "./OrderDetail";
import UserDetail from "./UserDetail";
import QueryDetail from "./QueryDetail";
// Navbar removed

const AdminDashboard = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [admin, setAdmin] = useState({ name: "", email: "", role: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Check 'adminUser', then 'user', then 'admin' keys in localStorage
    const storedAdminUser = localStorage.getItem("adminUser");
    const storedUser = localStorage.getItem("user");
    const storedAdmin = localStorage.getItem("admin");

    if (storedAdminUser) {
      setAdmin(JSON.parse(storedAdminUser));
    } else if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.role === "ADMIN") {
        setAdmin(userData);
      }
    } else if (storedAdmin) {
      const adminData = JSON.parse(storedAdmin);
      setAdmin(adminData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/login");
  };

  return (
    <>
      {/* Admin Header */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-600" />
            <span className="text-gray-700 font-medium">
              {admin.name || admin.email || "Admin"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div
        className="flex bg-gray-50"
        style={{ paddingTop: "64px", minHeight: "100vh" }}
      >
        <div className="w-64 bg-white shadow-lg p-5 fixed top-16 left-0 bottom-0 overflow-y-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>

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
            <li
              onClick={() => setTabIndex(3)}
              className={`flex items-center gap-3 px-4 py-2 rounded cursor-pointer ${tabIndex === 3
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaQuestionCircle /> Queries
            </li>



          </ul>
        </div>

        <div className="flex-1 ml-64 overflow-auto">
          <div className="bg-white py-4 px-6 shadow text-center mb-5">
            <h1 className="text-2xl font-bold text-gray-800">
              {tabIndex === 0 ? "Products Management" :
                tabIndex === 1 ? "Orders Management" :
                  tabIndex === 2 ? "Users Management" : "Support Queries"}
            </h1>
          </div>

          <div className="mt-6">
            {tabIndex === 0 && <ProductDetail />}
            {tabIndex === 1 && <OrderDetail />}
            {tabIndex === 2 && <UserDetail />}
            {tabIndex === 3 && <QueryDetail />}
          </div>

        </div>
      </div>
    </>
  );
};

export default AdminDashboard;

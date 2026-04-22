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
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 h-16 flex items-center justify-between px-4 md:px-6">
        <h1 className="text-lg md:text-xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <FaUser className="text-gray-600" />
            <span className="text-gray-700 font-medium text-sm md:text-base hidden sm:block">
              {admin.name || admin.email || "Admin"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors text-sm md:text-base"
          >
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div
        className="flex flex-col md:flex-row bg-gray-50"
        style={{ paddingTop: "64px", minHeight: "100vh" }}
      >
        <div className="w-full md:w-64 bg-white shadow-lg p-3 md:p-5 static md:fixed top-16 left-0 md:bottom-0 overflow-x-auto md:overflow-y-auto z-40 border-b md:border-b-0">
          <h1 className="text-2xl font-bold mb-6 text-center hidden md:block">Admin Panel</h1>

          <div className="py-5 mb-5 text-center border-b hidden md:block">
            <FaUser size={40} className="mx-auto mb-4 text-gray-600" />
          </div>

          <ul className="flex flex-row md:flex-col space-x-2 md:space-x-0 space-y-0 md:space-y-4 pt-1 md:pt-4 min-w-max md:min-w-0 pb-2 md:pb-0">
            <li
              onClick={() => setTabIndex(0)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded cursor-pointer text-xs md:text-base whitespace-nowrap ${tabIndex === 0
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaShoppingBag className="text-lg md:text-base" /> <span>Products</span>
            </li>
            <li
              onClick={() => setTabIndex(1)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded cursor-pointer text-xs md:text-base whitespace-nowrap ${tabIndex === 1
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaListUl className="text-lg md:text-base" /> <span>Orders</span>
            </li>
            <li
              onClick={() => setTabIndex(2)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded cursor-pointer text-xs md:text-base whitespace-nowrap ${tabIndex === 2
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaUser className="text-lg md:text-base" /> <span>Users</span>
            </li>
            <li
              onClick={() => setTabIndex(3)}
              className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-3 py-2 md:px-4 md:py-2 rounded cursor-pointer text-xs md:text-base whitespace-nowrap ${tabIndex === 3
                ? "bg-gray-100 text-black font-semibold"
                : "text-black hover:bg-gray-100"
                }`}
            >
              <FaQuestionCircle className="text-lg md:text-base" /> <span>Queries</span>
            </li>
          </ul>
        </div>

        <div className="flex-1 md:ml-64 overflow-x-hidden w-full px-2 md:px-6">
          <div className="bg-white py-3 md:py-4 px-4 md:px-6 shadow text-center mb-4 md:mb-5 rounded-md mt-4 md:mt-6">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">
              {tabIndex === 0 ? "Products Management" :
                tabIndex === 1 ? "Orders Management" :
                  tabIndex === 2 ? "Users Management" : "Support Queries"}
            </h1>
          </div>

          <div className="mb-6">
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

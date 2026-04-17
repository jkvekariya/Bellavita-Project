import React, { useEffect, useState, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Api from "../../Apis/backendApi";
import Layout from "../layout/layout";
import { toast } from "react-hot-toast";

export default function MyOrdersPage() {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async (showToast = false) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(Api.GetMyOrders.url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && Array.isArray(data)) {
        setOrders(data);
        if (showToast) toast.success("Orders updated successfully!");
      } else {
        setOrders([]);
        console.warn("Unexpected orders format:", data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Header Section */}
          <div className="mb-8 md:mb-5 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-0 font-['Jost'] tracking-wide">
                My Orders
              </h1>
              <p className="text-gray-600 font-['Lato']">
                Track and manage your orders
              </p>
            </div>
            <button
              onClick={() => fetchOrders(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
              title="Refresh Orders"
            >
              <i className="fa-solid fa-rotate-right text-gray-500 group-hover:text-black transition-colors group-hover:rotate-180 duration-500"></i>
              <span className="text-sm font-medium text-gray-700 group-hover:text-black">Refresh Status</span>
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-96 bg-white rounded-2xl shadow-lg">
              <div className="text-center">
                <i className="fa-solid fa-shopping-bag text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-600 text-xl font-['Lato'] mb-2">No orders yet</p>
                <p className="text-gray-500 text-sm">Start shopping to see your orders here</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 md:p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="text-xs text-gray-300 mb-1 font-['Lato']">Order ID</p>
                        <p className="font-mono text-sm md:text-base font-semibold">{order._id}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-gray-300 mb-1">Order Date</p>
                          <p className="text-sm font-semibold">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}</p>
                        </div>
                        <div className="h-12 w-px bg-gray-600 hidden md:block"></div>
                        <div>
                          <p className="text-xs text-gray-300 mb-1">Total Amount</p>
                          <p className="text-xl font-bold text-green-400">₹{order.totalAmount}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    {/* Order Items */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-6">
                        <i className="fa-solid fa-box text-gray-700"></i>
                        <h3 className="font-bold text-xl text-gray-900 font-['Jost']">Order Items</h3>
                        <span className="ml-auto px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 capitalize">
                          {order.status}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item, idx) => {
                          const product = item.productId;
                          return (
                            <div
                              key={idx}
                              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors border border-gray-200"
                            >
                              <div className="w-full sm:w-28 h-28 flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-200">
                                <img
                                  src={product?.image || "/placeholder.jpg"}
                                  alt={product?.name}
                                  className="w-full h-full object-contain p-2"
                                />
                              </div>
                              <div className="flex-1 w-full">
                                <p className="font-semibold text-lg text-gray-900 mb-2 font-['Jost']">
                                  {product?.name}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                  <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-box-open text-gray-500"></i>
                                    <span>Qty: <strong className="text-gray-900">{item.quantity}</strong></span>
                                  </div>
                                  {product?.price && (
                                    <div className="flex items-center gap-2">
                                      <i className="fa-solid fa-indian-rupee-sign text-gray-500"></i>
                                      <span>₹{product.price} each</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Order Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Summary */}
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center gap-2 mb-4">
                          <i className="fa-solid fa-receipt text-blue-700"></i>
                          <h3 className="font-bold text-lg text-gray-900 font-['Jost']">Order Summary</h3>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                            <span className="text-sm text-gray-700 font-['Lato']">Order ID</span>
                            <span className="text-sm font-mono text-gray-900 truncate max-w-[180px]" title={order._id}>
                              {order._id.slice(-8)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                            <span className="text-sm text-gray-700 font-['Lato']">Status</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
                              ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'}`}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center pb-2 border-b border-blue-200">
                            <span className="text-sm text-gray-700 font-['Lato']">Items</span>
                            <span className="text-sm font-semibold text-gray-900">{order.items.length}</span>
                          </div>
                          <div className="flex justify-between items-center pt-2">
                            <span className="text-base font-bold text-gray-900 font-['Jost']">Total Amount</span>
                            <span className="text-xl font-bold text-green-600">₹{order.totalAmount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Delivery Address */}
                      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                        <div className="flex items-center gap-2 mb-4">
                          <i className="fa-solid fa-location-dot text-green-700"></i>
                          <h3 className="font-bold text-lg text-gray-900 font-['Jost']">Delivery Address</h3>
                        </div>
                        <div className="text-gray-700 space-y-2 font-['Lato']">
                          <p className="font-bold text-gray-900 text-base flex items-center gap-2">
                            <i className="fa-solid fa-user text-sm text-green-700"></i>
                            {order.fullName}
                          </p>
                          <div className="pl-6 space-y-1 text-sm">
                            <p>{order.address.line1}</p>
                            {order.address.line2 && <p>{order.address.line2}</p>}
                            <p className="font-semibold">
                              {order.address.city}, {order.address.state} - {order.address.pincode}
                            </p>
                            <p className="flex items-center gap-2 mt-3 pt-3 border-t border-green-200">
                              <i className="fa-solid fa-phone text-green-700"></i>
                              <span className="font-semibold">{order.mobileNumber}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

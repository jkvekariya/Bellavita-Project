import React, { useEffect, useState, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Api from "../../Apis/backendApi";
import Layout from "../layout/layout";

export default function MyOrdersPage() {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
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
        } else {
          setOrders([]);
          console.warn("Unexpected orders format:", data);
        }
      } catch (error) {
        console.error("Failed to fetch orders", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 max-w-6xl">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">My Orders</h2>
        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600 text-lg">You have no orders yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border rounded-lg p-4 md:p-6 shadow-md bg-white">
                <div>
                  <h3 className="font-bold text-lg mb-4  pb-2">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item, idx) => {
                      const product = item.productId;
                      return (
                        <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center gap-4  pb-4">
                          <div className="w-full sm:w-32 flex-shrink-0">
                            <img
                              src={product?.image || "/placeholder.jpg"}
                              alt={product?.name}
                              className="w-full h-32 object-contain rounded border"
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <p className="font-semibold text-lg">{product?.name}</p>
                            <p className="text-gray-600 mt-2">
                              Quantity: {item.quantity}
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">Order Summary</h3>
                    <p className="mb-2">
                      <strong>Order ID:</strong>{" "}
                      <span className="text-gray-700">{order._id}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Status:</strong>{" "}
                      <span className="capitalize text-blue-600">{order.status}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Total:</strong>{" "}
                      <span className="text-green-600 font-bold">₹{order.totalAmount}</span>
                    </p>
                    <p className="mb-2">
                      <strong>Date:</strong>{" "}
                      <span className="text-gray-700">{new Date(order.createdAt).toLocaleDateString()}</span>
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold text-lg mb-3">Delivery Address</h3>
                    <div className="text-gray-700">
                      <p className="font-medium">{order.fullName}</p>
                      <p>{order.address.line1}</p>
                      {order.address.line2 && <p>{order.address.line2}</p>}
                      <p>
                        {order.address.city}, {order.address.state} - {order.address.pincode}
                      </p>
                      <p className="mt-2">Mobile: {order.mobileNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

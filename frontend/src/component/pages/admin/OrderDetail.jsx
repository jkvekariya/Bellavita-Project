import React, { useEffect, useState } from 'react';
import Api from '../../../Apis/backendApi';

const AllOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [updating, setUpdating] = useState('');

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            const response = await fetch(Api.getAllOrders.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to fetch orders');
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            setUpdating(orderId);
            const token = localStorage.getItem('token');

            const response = await fetch(Api.updateOrderStatus(orderId).url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            let result = null;
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                result = await response.json();
            } else {
                const text = await response.text();
                throw new Error(text || 'Unexpected server error');
            }

            if (!response.ok) {
                throw new Error(result?.error || 'Failed to update status');
            }

            if (result?.order) {
                setOrders((prev) =>
                    prev.map((order) => (order._id === orderId ? result.order : order))
                );
            }
        } catch (err) {
            alert(err.message);
        } finally {
            setUpdating('');
        }
    };

    const statusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">All Orders</h2>

            {loading && <div className="text-gray-600">Loading orders...</div>}
            {error && <div className="text-red-600 font-medium">{error}</div>}

            {!loading && !error && orders.length === 0 && (
                <p className="text-gray-500">No orders found.</p>
            )}

            {!loading && !error && orders.length > 0 && (
                <div className="overflow-x-auto rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-3 text-left">User</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Items</th>
                                <th className="px-4 py-3 text-left">Total</th>
                                <th className="px-4 py-3 text-left">Status</th>
                                <th className="px-4 py-3 text-left">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{order.userId?.name || 'N/A'}</td>
                                    <td className="px-4 py-3">{order.userId?.email || 'N/A'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {order.items.map((item, i) => (
                                            <div key={i}>
                                                {item.productId?.name}{' '}
                                                <span className="text-xs text-gray-500">(x{item.quantity})</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="px-4 py-3 font-medium">₹{order.totalAmount}</td>
                                    <td className="px-4 py-3">
                                        <select
                                            value={order.status}
                                            disabled={updating === order._id}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="px-2 py-1 border rounded text-sm"
                                        >
                                            {statusOptions.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-600">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllOrdersPage;
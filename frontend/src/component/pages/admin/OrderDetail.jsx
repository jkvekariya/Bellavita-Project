import React, { useEffect, useState } from 'react';
import Api from '../../../Apis/backendApi';
import { Eye, FileText, Download, X, Search, Filter, ChevronDown, CheckCircle, AlertCircle, Clock, Truck } from 'lucide-react';
import toast from 'react-hot-toast';

const OrderDetail = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');

    const statusColors = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Confirmed': 'bg-blue-100 text-blue-800',
        'Processing': 'bg-indigo-100 text-indigo-800',
        'Shipped': 'bg-purple-100 text-purple-800',
        'Out for Delivery': 'bg-orange-100 text-orange-800',
        'Delivered': 'bg-green-100 text-green-800',
        'Cancelled': 'bg-red-100 text-red-800',
        'Returned': 'bg-gray-100 text-gray-800',
        'Refunded': 'bg-pink-100 text-pink-800',
    };

    const statusOptions = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Returned', 'Refunded'];

    const fetchAllOrders = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
            const userStr = localStorage.getItem('adminUser') || localStorage.getItem('user');

            if (!token || !userStr) {
                setError('Please login as admin');
                return;
            }

            const response = await fetch(Api.getAllOrders.url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                window.location.href = '/login';
                return;
            }

            const data = await response.json();
            if (response.ok) {
                setOrders(data);
            } else {
                throw new Error(data.error || 'Failed to fetch orders');
            }
        } catch (err) {
            setError(err.message);
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const handleUpdateStatus = async (orderId, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(Api.updateOrderStatus(orderId).url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();
            if (response.ok) {
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
                toast.success(`Order updated to ${newStatus}`);
            } else {
                throw new Error(data.error || 'Update failed');
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const downloadInvoice = (order) => {
        const invoiceContent = `
            <html>
            <head>
                <title>Invoice - ${order.orderId || order._id}</title>
                <style>
                    body { font-family: 'Helvetica', sans-serif; padding: 40px; }
                    .header { display: flex; justify-content: space-between; margin-bottom: 40px; border-bottom: 2px solid #eee; padding-bottom: 20px; }
                    .company-info h1 { margin: 0; color: #333; }
                    .invoice-details { text-align: right; }
                    .section-title { font-size: 14px; color: #666; text-transform: uppercase; margin-bottom: 10px; font-weight: bold; }
                    .address-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px; }
                    table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
                    th { text-align: left; padding: 12px; background: #f8f9fa; border-bottom: 2px solid #eee; }
                    td { padding: 12px; border-bottom: 1px solid #eee; }
                    .total-section { text-align: right; margin-top: 20px; }
                    .total-row { display: flex; justify-content: flex-end; gap: 20px; font-size: 18px; font-weight: bold; }
                </style>
            </head>
            <body>
                <div class="header">
                    <div class="company-info">
                        <h1>BELLAVITA</h1>
                        <p>Luxury Perfumes & Body Care</p>
                    </div>
                    <div class="invoice-details">
                        <h2>INVOICE</h2>
                        <p>Order ID: ${order.orderId || order._id}</p>
                        <p>Date: ${new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Status: ${order.paymentStatus || 'Pending'}</p>
                    </div>
                </div>

                <div class="address-grid">
                    <div>
                        <div class="section-title">Billed To</div>
                        <p><strong>${order.fullName}</strong></p>
                        <p>${order.email}</p>
                        <p>${order.mobileNumber}</p>
                    </div>
                    <div>
                        <div class="section-title">Shipping Address</div>
                        <p>${order.address.line1}</p>
                        <p>${order.address.city}, ${order.address.state}</p>
                        <p>${order.address.pincode}</p>
                    </div>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.productId?.name || 'Unknown Item'}</td>
                                <td>${item.quantity}</td>
                                <td>₹${item.productId?.realprice || item.productId?.price || 0}</td>
                                <td>₹${(item.productId?.realprice || item.productId?.price || 0) * item.quantity}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>

                <div class="total-section">
                    <div class="total-row">
                        <span>Grand Total:</span>
                        <span>₹${order.totalAmount}</span>
                    </div>
                    <p style="margin-top: 10px; color: #666; font-size: 14px;">Payment Method: ${order.paymentMethod || 'Online'}</p>
                </div>
                
                <script>
                    window.onload = function() { window.print(); }
                </script>
            </body>
            </html>
        `;

        const win = window.open('', '_blank');
        win.document.write(invoiceContent);
        win.document.close();
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearch =
            (order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.fullName && order.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.userId?.name && order.userId.name.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter ? order.status === statusFilter : true;
        const matchesDate = dateFilter ? new Date(order.createdAt).toISOString().split('T')[0] === dateFilter : true;

        return matchesSearch && matchesStatus && matchesDate;
    });

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gray-50">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Order Management</h2>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center min-w-[120px]">
                        <p className="text-gray-500 text-xs uppercase">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center min-w-[120px]">
                        <p className="text-gray-500 text-xs uppercase">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'Pending').length}</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by Order ID, Name..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <select
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="">All Statuses</option>
                        {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <input
                        type="date"
                        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        {order.orderId || `#${order._id.slice(-6).toUpperCase()}`}
                                        <div className="text-xs text-gray-500 mt-1">{order.orderType || 'Online'}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{order.fullName}</div>
                                        <div className="text-xs text-gray-500">{order.mobileNumber}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-bold">₹{order.totalAmount}</div>
                                        <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                            {order.paymentMethod || 'Online'}
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] ${order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {order.paymentStatus || 'Pending'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() => setSelectedOrder(order)}
                                                className="p-2 hover:bg-gray-100 rounded-full text-blue-600 transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={18} />
                                            </button>
                                            <button
                                                onClick={() => downloadInvoice(order)}
                                                className="p-2 hover:bg-gray-100 rounded-full text-gray-600 transition-colors"
                                                title="Download Invoice"
                                            >
                                                <Download size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                        No orders found matching your filters.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Order Details</h3>
                                <p className="text-sm text-gray-500">ID: {selectedOrder.orderId || selectedOrder._id}</p>
                            </div>
                            <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-full">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Left Column: Status & Customer */}
                            <div className="md:col-span-2 space-y-6">
                                {/* Status Tracker (Simple) */}
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                                        <Truck size={18} /> Order Status
                                    </h4>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColors[selectedOrder.status]}`}>
                                            {selectedOrder.status}
                                        </span>
                                    </div>

                                    <label className="text-sm text-gray-600 block mb-2">Update Status:</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={selectedOrder.status}
                                            onChange={(e) => handleUpdateStatus(selectedOrder._id, e.target.value)}
                                            className="flex-1 p-2 border border-gray-300 rounded-md"
                                        >
                                            {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </div>

                                    <div className="mt-4 flex gap-3">
                                        {selectedOrder.status !== 'Cancelled' && selectedOrder.status !== 'Delivered' && (
                                            <button
                                                onClick={() => handleUpdateStatus(selectedOrder._id, 'Cancelled')}
                                                className="px-4 py-2 bg-red-50 text-red-600 rounded-md text-sm font-medium hover:bg-red-100 border border-red-200"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                        {(selectedOrder.status === 'Cancelled' || selectedOrder.status === 'Returned') && (
                                            <button
                                                onClick={() => handleUpdateStatus(selectedOrder._id, 'Refunded')}
                                                className="px-4 py-2 bg-pink-50 text-pink-600 rounded-md text-sm font-medium hover:bg-pink-100 border border-pink-200"
                                            >
                                                Mark as Refunded
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Items Table */}
                                <div>
                                    <h4 className="font-semibold mb-3">Order Items</h4>
                                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                                        <table className="w-full text-sm">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-4 py-2 text-left">Product</th>
                                                    <th className="px-4 py-2 text-center">Qty</th>
                                                    <th className="px-4 py-2 text-right">Price</th>
                                                    <th className="px-4 py-2 text-right">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {selectedOrder.items.map((item, i) => (
                                                    <tr key={i}>
                                                        <td className="px-4 py-3 flex items-center gap-3">
                                                            <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                                                                <img src={item.productId?.image?.[0]} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <span className="font-medium">{item.productId?.name}</span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">{item.quantity}</td>
                                                        <td className="px-4 py-3 text-right">₹{item.productId?.realprice || item.productId?.price || 0}</td>
                                                        <td className="px-4 py-3 text-right font-medium">₹{(item.productId?.realprice || item.productId?.price || 0) * item.quantity}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Details */}
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <h4 className="font-semibold mb-3">Customer Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <p><span className="text-gray-500">Name:</span> <span className="font-medium text-gray-900">{selectedOrder.fullName}</span></p>
                                        <p><span className="text-gray-500">Email:</span> {selectedOrder.email}</p>
                                        <p><span className="text-gray-500">Phone:</span> {selectedOrder.mobileNumber}</p>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <h4 className="font-semibold mb-3">Shipping Address</h4>
                                    <div className="text-sm text-gray-700 leading-relaxed">
                                        {selectedOrder.address.line1}<br />
                                        {selectedOrder.address.city}, {selectedOrder.address.state}<br />
                                        {selectedOrder.address.pincode}<br />
                                        INDIA
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                                    <h4 className="font-semibold mb-3">Payment Info</h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Method:</span>
                                            <span className="font-medium">{selectedOrder.paymentMethod || 'Online'}</span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Status:</span>
                                            <span className={`px-2 py-0.5 rounded text-xs ${selectedOrder.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                                {selectedOrder.paymentStatus}
                                            </span>
                                        </p>
                                        <p className="flex justify-between">
                                            <span className="text-gray-500">Txn ID:</span>
                                            <span className="font-mono text-xs" title={selectedOrder.transactionId || selectedOrder.paymentId}>{selectedOrder.transactionId ? selectedOrder.transactionId.slice(0, 8) + '...' : 'N/A'}</span>
                                        </p>
                                        <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-bold text-lg">
                                            <span>Total:</span>
                                            <span>₹{selectedOrder.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl flex justify-end">
                            <button
                                onClick={() => downloadInvoice(selectedOrder)}
                                className="px-4 py-2 bg-black text-white rounded-lg flex items-center gap-2 hover:bg-gray-800"
                            >
                                <Download size={16} /> Download Invoice
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderDetail;
import React, { useEffect, useState, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import Api from "../../Apis/backendApi";
import Layout from "../layout/layout";
import { toast } from "react-hot-toast";

export default function MyOrdersPage() {
  const { user } = useContext(Context);
  const [orders, setOrders] = useState([]);
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState(null);
  const navigate = useNavigate();

  const formatCurrency = (value) => `₹${Number(value || 0).toFixed(2)}`;

  const formatDate = (value) =>
    new Date(value).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const getInvoiceItems = (order) =>
    (order?.items || []).map((item) => {
      const product = item?.productId || {};
      const unitPrice = Number(
        product?.discountprice ?? product?.realprice ?? product?.price ?? 0
      );
      const quantity = Number(item?.quantity || 0);
      return {
        name: product?.name || "Product",
        quantity,
        unitPrice,
        total: unitPrice * quantity,
      };
    });

  const buildInvoiceHtml = (order) => {
    const items = getInvoiceItems(order);
    const itemsRows = items
      .map(
        (item, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${formatCurrency(item.unitPrice)}</td>
            <td>${formatCurrency(item.total)}</td>
          </tr>
        `
      )
      .join("");

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Invoice ${order?._id || ""}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; background: #f7f7f7; color: #111827; }
            .page { max-width: 920px; margin: 24px auto; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 18px; overflow: hidden; }
            .hero { padding: 32px; background: linear-gradient(135deg, #111827 0%, #1f2937 100%); color: white; }
            .hero h1 { margin: 0 0 8px; font-size: 28px; }
            .hero p { margin: 0; color: #d1d5db; font-size: 14px; }
            .section { padding: 28px 32px; }
            .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; margin-bottom: 24px; }
            .card { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 14px; padding: 16px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: .08em; color: #6b7280; margin-bottom: 8px; }
            .value { font-size: 15px; font-weight: 600; color: #111827; }
            table { width: 100%; border-collapse: collapse; overflow: hidden; border: 1px solid #e5e7eb; border-radius: 14px; }
            thead { background: #f3f4f6; }
            th, td { padding: 14px 12px; text-align: left; font-size: 14px; border-bottom: 1px solid #e5e7eb; }
            th { font-size: 12px; text-transform: uppercase; letter-spacing: .06em; color: #4b5563; }
            .total { margin-top: 24px; display: flex; justify-content: flex-end; }
            .total-box { min-width: 280px; background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 14px; padding: 18px; }
            .total-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; color: #374151; }
            .grand { padding-top: 12px; border-top: 1px solid #d1d5db; font-size: 18px; font-weight: 700; color: #111827; }
            .footer { padding: 0 32px 32px; font-size: 13px; color: #6b7280; }
            @media print {
              body { background: #fff; }
              .page { margin: 0; max-width: none; border: none; border-radius: 0; }
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div class="hero">
              <h1>Bellavita Invoice</h1>
              <p>Thank you for shopping with us.</p>
            </div>
            <div class="section">
              <div class="grid">
                <div class="card">
                  <div class="label">Invoice / Order ID</div>
                  <div class="value">${order?._id || "-"}</div>
                </div>
                <div class="card">
                  <div class="label">Order Date</div>
                  <div class="value">${formatDate(order?.createdAt)}</div>
                </div>
                <div class="card">
                  <div class="label">Customer</div>
                  <div class="value">${order?.fullName || "-"}</div>
                </div>
                <div class="card">
                  <div class="label">Status</div>
                  <div class="value" style="text-transform: capitalize;">${order?.status || "-"}</div>
                </div>
              </div>

              <div class="card" style="margin-bottom: 24px;">
                <div class="label">Delivery Address</div>
                <div class="value" style="font-size: 14px; line-height: 1.7; font-weight: 500;">
                  ${order?.address?.line1 || ""}<br/>
                  ${order?.address?.line2 ? `${order.address.line2}<br/>` : ""}
                  ${order?.address?.city || ""}, ${order?.address?.state || ""} - ${order?.address?.pincode || ""}<br/>
                  Mobile: ${order?.mobileNumber || "-"}
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Unit Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>

              <div class="total">
                <div class="total-box">
                  <div class="total-row">
                    <span>Items</span>
                    <span>${order?.items?.length || 0}</span>
                  </div>
                  <div class="total-row grand">
                    <span>Grand Total</span>
                    <span>${formatCurrency(order?.totalAmount)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer">
              This is a system-generated invoice for your Bellavita order.
            </div>
          </div>
        </body>
      </html>
    `;
  };

  const openInvoice = (order) => {
    setSelectedInvoiceOrder(order);
  };

  const downloadInvoice = (order) => {
    const html = buildInvoiceHtml(order);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bellavita-invoice-${order?._id?.slice(-8) || "order"}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Invoice downloaded");
  };

  const printInvoice = (order) => {
    const invoiceWindow = window.open("", "_blank", "width=1000,height=800");
    if (!invoiceWindow) {
      toast.error("Please allow popups to view invoice");
      return;
    }

    invoiceWindow.document.open();
    invoiceWindow.document.write(buildInvoiceHtml(order));
    invoiceWindow.document.close();
    invoiceWindow.focus();
  };

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
            <div className="flex flex-col gap-3 w-fit">
              <button
                onClick={() => fetchOrders(true)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 group"
                title="Refresh Orders"
              >
                <i className="fa-solid fa-rotate-right text-gray-500 group-hover:text-black transition-colors group-hover:rotate-180 duration-500"></i>
                <span className="text-sm font-medium text-gray-700 group-hover:text-black">Refresh Status</span>
              </button>
              <button
                onClick={() => openInvoice(orders[0])}
                disabled={!orders.length}
                className="inline-flex items-center justify-center gap-2 self-start px-4 py-2.5 rounded-xl bg-gray-900 text-white shadow-sm hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                title="View Invoice"
              >
                <i className="fa-solid fa-file-invoice"></i>
                <span className="text-sm font-medium">Invoice</span>
              </button>
            </div>
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

                      <div className="flex justify-end mb-4">
                        <button
                          onClick={() => openInvoice(order)}
                          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:border-gray-900 hover:text-gray-900 transition-colors"
                        >
                          <i className="fa-solid fa-file-invoice"></i>
                          View Invoice
                        </button>
                      </div>

                      <div className="space-y-4">
                        {order.items.map((item, idx) => {
                          const product = item.productId;
                          const primaryImage = Array.isArray(product?.image) ? product.image[0] : product?.image;
                          const unitPrice = Number(product?.discountprice ?? product?.realprice ?? product?.price ?? 0);
                          const lineTotal = unitPrice * Number(item.quantity || 0);
                          const itemSize =
                            item?.size ||
                            item?.selectedSize ||
                            item?.variant?.size ||
                            product?.size ||
                            "";
                          return (
                            <div
                              key={idx}
                              className="flex items-start gap-3 p-3 bg-white rounded-xl transition-colors border border-gray-200/70 hover:border-gray-300"
                            >
                              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-200/70">
                                <img
                                  src={primaryImage || "/placeholder.jpg"}
                                  alt={product?.name}
                                  className="w-full h-full object-contain p-2"
                                />
                              </div>
                              <div className="flex-1 w-full">
                                <p className="font-semibold text-[13px] md:text-lg lg:text-xl text-gray-900 leading-snug font-['Jost']">
                                  {product?.name}
                                </p>
                                {itemSize && (
                                  <p className="text-[11px] md:text-sm lg:text-base text-gray-500 mt-1">
                                    Size: <span className="font-medium text-gray-700">{itemSize}</span>
                                  </p>
                                )}
                                <div className="mt-1.5 text-[11px] md:text-sm lg:text-base text-gray-600 space-y-1.5">
                                  <div className="flex items-center gap-2">
                                    <i className="fa-solid fa-box-open text-gray-400 text-[11px] md:text-sm lg:text-base"></i>
                                    <span>
                                      Qty: <strong className="text-gray-900">{item.quantity}</strong>
                                    </span>
                                  </div>
                                  <p className="font-semibold text-gray-900 text-[13px] md:text-lg lg:text-xl">
                                    ₹{lineTotal.toFixed(2)}
                                  </p>
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
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-6">
          <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-[28px] bg-white shadow-2xl border border-white/60">
            <div className="border-b border-gray-200 bg-gradient-to-r from-gray-900 to-gray-800 px-5 py-4 md:px-8 md:py-5 text-white flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-gray-300">Invoice Preview</p>
                <h2 className="text-xl md:text-2xl font-semibold font-['Jost']">
                  Order #{selectedInvoiceOrder._id?.slice(-8)}
                </h2>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => printInvoice(selectedInvoiceOrder)}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
                >
                  <i className="fa-solid fa-eye"></i>
                  Show Invoice
                </button>
                <button
                  onClick={() => downloadInvoice(selectedInvoiceOrder)}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
                >
                  <i className="fa-solid fa-download"></i>
                  Download
                </button>
                <button
                  onClick={() => setSelectedInvoiceOrder(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                  Close
                </button>
              </div>
            </div>

            <div className="max-h-[calc(90vh-96px)] overflow-y-auto bg-[#f6f7fb] p-4 md:p-8">
              <div className="mx-auto max-w-4xl rounded-[28px] border border-gray-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.08)] overflow-hidden">
                <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-800 px-6 py-8 md:px-10 text-white">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-300">Bellavita</p>
                      <h3 className="mt-2 text-3xl font-semibold font-['Jost']">Invoice</h3>
                      <p className="mt-2 text-sm text-gray-300">A clean summary of your order details.</p>
                    </div>
                    <div className="rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-gray-300">Invoice ID</p>
                      <p className="mt-1 font-mono text-sm md:text-base">{selectedInvoiceOrder._id}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Customer</p>
                      <p className="mt-2 text-lg font-semibold text-gray-900">{selectedInvoiceOrder.fullName}</p>
                      <p className="mt-1 text-sm text-gray-600">{selectedInvoiceOrder.mobileNumber}</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Order Details</p>
                      <div className="mt-2 space-y-1 text-sm text-gray-700">
                        <p>Date: <span className="font-medium text-gray-900">{formatDate(selectedInvoiceOrder.createdAt)}</span></p>
                        <p>Status: <span className="font-medium capitalize text-gray-900">{selectedInvoiceOrder.status}</span></p>
                        <p>Items: <span className="font-medium text-gray-900">{selectedInvoiceOrder.items.length}</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
                    <div className="border-b border-gray-200 bg-gray-50 px-5 py-4">
                      <h4 className="text-lg font-semibold text-gray-900 font-['Jost']">Items Billed</h4>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {getInvoiceItems(selectedInvoiceOrder).map((item, index) => (
                        <div key={`${item.name}-${index}`} className="grid grid-cols-[1fr_auto] gap-4 px-5 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            <p className="mt-1 text-xs text-gray-500">
                              Qty: {item.quantity} x {formatCurrency(item.unitPrice)}
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-gray-900 self-center">{formatCurrency(item.total)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">Delivery Address</p>
                      <div className="mt-3 text-sm leading-7 text-gray-700">
                        <p>{selectedInvoiceOrder.address?.line1}</p>
                        {selectedInvoiceOrder.address?.line2 && <p>{selectedInvoiceOrder.address.line2}</p>}
                        <p>
                          {selectedInvoiceOrder.address?.city}, {selectedInvoiceOrder.address?.state} - {selectedInvoiceOrder.address?.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-gray-200 bg-slate-950 p-5 text-white">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Total Amount</p>
                      <p className="mt-3 text-3xl font-semibold">{formatCurrency(selectedInvoiceOrder.totalAmount)}</p>
                      <p className="mt-2 text-sm text-gray-400">This invoice is generated from your order details.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

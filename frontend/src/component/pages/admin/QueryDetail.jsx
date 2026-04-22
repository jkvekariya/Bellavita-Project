import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Api from "../../../Apis/backendApi";

const QueryDetail = () => {
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchQueries = async () => {
        try {
            const res = await fetch(Api.getAllContacts.url);
            const data = await res.json();
            if (res.ok) {
                setQueries(data);
            } else {
                toast.error("Failed to fetch queries");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching queries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQueries();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const api = Api.updateContactStatus(id);
            const res = await fetch(api.url, {
                method: api.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                toast.success(`Query marked as ${newStatus}`);
                fetchQueries(); // Refresh
            } else {
                toast.error("Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating status");
        }
    };

    if (loading) return <div className="p-5">Loading queries...</div>;

    return (
        <div className="p-2 md:p-6 bg-white min-h-screen">
            <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-4 ml-2 md:ml-0">User Inquiries</h2>
            <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
                <table className="min-w-full leading-normal text-left whitespace-nowrap min-w-max">
                    <thead className="bg-gray-100 text-gray-600">
                        <tr>
                            <th className="px-3 md:px-5 py-2 md:py-3 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                                Name / Email
                            </th>
                            <th className="px-3 md:px-5 py-2 md:py-3 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                                Message
                            </th>
                            <th className="px-3 md:px-5 py-2 md:py-3 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-3 md:px-5 py-2 md:py-3 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {queries.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4 text-sm text-gray-500">No queries found</td>
                            </tr>
                        ) : (
                            queries.map((query) => (
                                <tr key={query._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-3 md:px-5 py-3 border-b border-gray-100 bg-white text-xs md:text-sm">
                                        <p className="text-gray-900 font-bold">{query.name || "N/A"}</p>
                                        <p className="text-gray-600">{query.email}</p>
                                    </td>
                                    <td className="px-3 md:px-5 py-3 border-b border-gray-100 bg-white text-xs md:text-sm">
                                        <p className="text-gray-900 truncate max-w-[120px] md:max-w-xs" title={query.comment}>{query.comment}</p>
                                    </td>
                                    <td className="px-3 md:px-5 py-3 border-b border-gray-100 bg-white text-xs md:text-sm">
                                        <span
                                            className={`relative inline-block px-2 md:px-3 py-0.5 md:py-1 font-semibold leading-tight rounded-full text-[10px] md:text-xs 
                                            ${query.status === "Resolved" ? "bg-green-100 text-green-800" :
                                                    query.status === "Rejected" ? "bg-red-100 text-red-800" :
                                                        "bg-yellow-100 text-yellow-800"}`}
                                        >
                                            <span aria-hidden className="absolute inset-0 opacity-50 rounded-full"></span>
                                            <span className="relative">{query.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-3 md:px-5 py-3 border-b border-gray-100 bg-white text-xs md:text-sm">
                                        <div className="flex gap-1 md:gap-2">
                                            {query.status !== "Resolved" && (
                                                <button
                                                    onClick={() => handleStatusChange(query._id, "Resolved")}
                                                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-2 rounded text-[10px] md:text-xs transition-colors"
                                                >
                                                    Resolve
                                                </button>
                                            )}
                                            {query.status !== "Rejected" && (
                                                <button
                                                    onClick={() => handleStatusChange(query._id, "Rejected")}
                                                    className="bg-red-500 hover:bg-red-600 text-white font-medium py-1 px-2 rounded text-[10px] md:text-xs transition-colors"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                            {query.status !== "Processing" && (
                                                <button
                                                    onClick={() => handleStatusChange(query._id, "Processing")}
                                                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-2 rounded text-[10px] md:text-xs transition-colors"
                                                >
                                                    Process
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QueryDetail;

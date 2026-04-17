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
        <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">User Inquiries</h2>
            <div className="overflow-x-auto bg-white rounded shadow">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Name / Email
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Message
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {queries.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center py-4">No queries found</td>
                            </tr>
                        ) : (
                            queries.map((query) => (
                                <tr key={query._id}>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap font-bold">{query.name || "N/A"}</p>
                                        <p className="text-gray-600 whitespace-no-wrap">{query.email}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p className="text-gray-900 whitespace-no-wrap truncate max-w-xs" title={query.comment}>{query.comment}</p>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span
                                            className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full 
                                            ${query.status === "Resolved" ? "bg-green-200 text-green-900" :
                                                    query.status === "Rejected" ? "bg-red-200 text-red-900" :
                                                        "bg-yellow-200 text-yellow-900"}`}
                                        >
                                            <span aria-hidden className="absolute inset-0 opacity-50 rounded-full"></span>
                                            <span className="relative">{query.status}</span>
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div className="flex gap-2">
                                            {query.status !== "Resolved" && (
                                                <button
                                                    onClick={() => handleStatusChange(query._id, "Resolved")}
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded text-xs"
                                                >
                                                    Resolve
                                                </button>
                                            )}
                                            {query.status !== "Rejected" && (
                                                <button
                                                    onClick={() => handleStatusChange(query._id, "Rejected")}
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                            {query.status !== "Processing" && (
                                                <button
                                                    onClick={() => handleStatusChange(query._id, "Processing")}
                                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded text-xs"
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

import React, { useEffect, useState, useContext } from "react";
import Layout from "../../layout/layout";
import Context from "../../context/Context";
import Api from "../../../Apis/backendApi";
import toast from "react-hot-toast";

const MyQueriesPage = () => {
    const { user } = useContext(Context);
    const [queries, setQueries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQueries = async () => {
            if (!user) return;
            try {
                // Api.getUserContacts(user._id) returns object with url and method
                const api = Api.getUserContacts(user._id);
                const res = await fetch(api.url);
                const data = await res.json();
                if (res.ok) {
                    setQueries(data);
                } else {
                    toast.error("Failed to fetch your queries");
                }
            } catch (error) {
                console.error(error);
                toast.error("Error fetching queries");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchQueries();
        } else {
            setLoading(false);
        }
    }, [user]);

    if (!user) {
        return (
            <Layout>
                <div className="flex justify-center items-center h-screen">
                    Please log in to view your queries.
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 min-h-screen">
                <h1 className="text-3xl font-bold mb-6 text-center font-['Jost']">My Support Inquiries</h1>

                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : queries.length === 0 ? (
                    <div className="text-center text-gray-500">You haven't submitted any inquiries yet.</div>
                ) : (
                    <div className="grid gap-4 max-w-4xl mx-auto">
                        {queries.map((query) => (
                            <div key={query._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-sm text-gray-500">
                                        {new Date(query.createdAt).toLocaleDateString()}
                                    </span>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold
                                        ${query.status === "Resolved" ? "bg-green-100 text-green-800" :
                                                query.status === "Rejected" ? "bg-red-100 text-red-800" :
                                                    "bg-yellow-100 text-yellow-800"}`}
                                    >
                                        {query.status}
                                    </span>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Message</h3>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded">{query.comment}</p>
                                {query.status === 'Resolved' && <p className="mt-2 text-sm text-green-600">✓ Your query has been resolved.</p>}
                                {query.status === 'Rejected' && <p className="mt-2 text-sm text-red-600">✗ Your query has been rejected.</p>}
                                {query.status === 'Processing' && <p className="mt-2 text-sm text-yellow-600">⏳ Your query is being processed.</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default MyQueriesPage;

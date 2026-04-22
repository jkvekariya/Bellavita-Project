import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Api from "../../../Apis/backendApi";

const UserDetail = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUserId, setEditingUserId] = useState(null);
    const [newRole, setNewRole] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
            if (!token) {
                toast.error("Please login first");
                return;
            }

            const response = await axios.get(Api.getAlluser.url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            if (error.response?.status === 401) {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");
                toast.error("Session expired. Please login again.");
                window.location.href = "/login";
            } else if (error.response?.status === 403) {
                toast.error("Admin access required");
            } else {
                toast.error("Failed to fetch users");
            }
        } finally {
            setLoading(false);
        }
    };

    const startEditing = (userId, currentRole) => {
        setEditingUserId(userId);
        setNewRole(currentRole);
    };

    const cancelEditing = () => {
        setEditingUserId(null);
        setNewRole("");
    };

    const handleRoleChange = async (userId) => {
        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
            await axios.put(
                Api.updateUserRole(userId).url,
                { role: newRole },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Role updated successfully");
            setEditingUserId(null);
            fetchUsers();
        } catch (error) {
            console.error("Error updating role:", error);
            toast.error(error.response?.data?.message || "Failed to update role");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
            await axios.delete(Api.deleteUser(userId).url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success("User deleted successfully");
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading users...</div>;
    }

    return (
        <div className="p-4 md:p-8 m-2 md:m-4 lg:m-8 bg-white rounded-xl shadow-md">
            <div className="py-3 md:py-4 mb-4 md:mb-6 border-b border-pink-100 flex justify-between items-center">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800">All Users</h1>
            </div>

            <div className="w-full overflow-x-auto shadow-sm rounded-lg">
                <table className="w-full text-left border-collapse border-slate-200 text-slate-500 min-w-max">
                    <thead className="bg-slate-100 text-slate-700">
                        <tr>
                            <th className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold border-b border-slate-200">
                                S.No.
                            </th>
                            <th className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold border-b border-slate-200">
                                Name
                            </th>
                            <th className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold border-b border-slate-200">
                                Email
                            </th>
                            <th className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold border-b border-slate-200">
                                Role
                            </th>
                            <th className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base font-bold border-b border-slate-200">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0">
                                <td className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base">
                                    {index + 1}
                                </td>
                                <td className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base capitalize">
                                    {user.name}
                                </td>
                                <td className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base">
                                    {user.email}
                                </td>
                                <td className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base">
                                    {editingUserId === user._id ? (
                                        <select
                                            value={newRole}
                                            onChange={(e) => setNewRole(e.target.value)}
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="USER">USER</option>
                                            <option value="ADMIN">ADMIN</option>
                                        </select>
                                    ) : (
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${user.role === "ADMIN"
                                            ? "bg-purple-100 text-purple-800"
                                            : "bg-blue-100 text-blue-800"
                                            }`}>
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                <td className="h-10 md:h-12 px-4 md:px-6 text-sm md:text-base">
                                    <div className="flex items-center gap-2 md:gap-4">
                                        {editingUserId === user._id ? (
                                            <>
                                                <button
                                                    onClick={() => handleRoleChange(user._id)}
                                                    className="text-green-600 hover:text-green-700 font-medium cursor-pointer transition-colors"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={cancelEditing}
                                                    className="text-gray-500 hover:text-gray-700 font-medium cursor-pointer transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => startEditing(user._id, user.role)}
                                                className="text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors"
                                            >
                                                Edit Role
                                            </button>
                                        )}
                                        <button 
                                            onClick={() => handleDeleteUser(user._id)}
                                            className="text-red-500 hover:text-red-600 font-medium cursor-pointer transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserDetail;
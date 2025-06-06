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
            const token = localStorage.getItem("token");
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
            if (error.response?.status === 403) {
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
            const token = localStorage.getItem("token");
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

    if (loading) {
        return <div className="text-center py-8">Loading users...</div>;
    }

    return (
        <div>
            <div className="py-5 flex justify-between items-center">
                <h1 className="text-xl text-pink-300 font-bold">All Users</h1>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400">
                    <thead>
                        <tr>
                            <th className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold">
                                S.No.
                            </th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Name
                            </th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Email
                            </th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Role
                            </th>
                            <th className="h-12 px-6 text-md font-bold border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className="text-pink-300">
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                    {index + 1}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase">
                                    {user.name}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                    {user.email}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
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
                                        <span className={`px-2 py-1 rounded-full text-xs ${user.role === "ADMIN"
                                                ? "bg-purple-100 text-purple-800"
                                                : "bg-blue-100 text-blue-800"
                                            }`}>
                                            {user.role}
                                        </span>
                                    )}
                                </td>
                                <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500">
                                    {editingUserId === user._id ? (
                                        <>
                                            <button
                                                onClick={() => handleRoleChange(user._id)}
                                                className="text-green-500 mr-3 cursor-pointer"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelEditing}
                                                className="text-gray-500 cursor-pointer"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={() => startEditing(user._id, user.role)}
                                            className="text-green-500 mr-3 cursor-pointer"
                                        >
                                            Edit Role
                                        </button>
                                    )}
                                    <button className="text-red-500 cursor-pointer">
                                        Delete
                                    </button>
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
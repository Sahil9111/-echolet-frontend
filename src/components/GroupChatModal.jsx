import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";

function GroupChatModal({ isOpen, onClose }) {
    const { user, chat, setChat } = useContext(UserContext);
    const [groupName, setGroupName] = useState("");
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [search, setSearch] = useState("");

    if (!isOpen) return null;

    const handleSearch = async (query) => {
        setSearch(query);
        if (!query) return;
        try {
            const { data } = await axios.get(`/api/user?search=${query}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            });
            setSearchResult(data);
            console.log("ye h hmare search ", data)
        } catch (err) {
            console.error("Error searching users", err);
        }
    };

    const handleAddUser = (u) => {
        if (selectedUsers.find((s) => s._id === u._id)) return;
        setSelectedUsers([...selectedUsers, u]);
    };

    const handleRemoveUser = (u) => {
        setSelectedUsers(selectedUsers.filter((s) => s._id !== u._id));
    };

    const handleCreateGroup = async () => {
        if (!groupName || selectedUsers.length < 2) {
            alert("Group must have a name and at least 2 users");
            return;
        }

        try {
            const { data } = await axios.post(
                "/api/chat/group",
                {
                    name: groupName,
                    users: JSON.stringify(selectedUsers.map((u) => u._id)),
                },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                }
            );
            setChat([data, ...chat]);
            console.log("created successfully")
            onClose();
        } catch (err) {
            console.error("Error creating group", err);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Create Group Chat</h2>
                    <button onClick={onClose}>
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                {/* Group Name */}
                <input
                    type="text"
                    placeholder="Group Name"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />

                {/* Selected Users */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedUsers.map((u) => (
                        <span
                            key={u._id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-1"
                        >
                            {u.username}
                            <button onClick={() => handleRemoveUser(u)}>✕</button>
                        </span>
                    ))}
                </div>

                {/* Search Users */}
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <div className="max-h-32 overflow-y-auto">
                    {searchResult.length > 0 ? (
                        searchResult.map((u) => (
                            <div
                                key={u._id}
                                onClick={() => handleAddUser(u)}

                                className="cursor-pointer p-2 rounded hover:bg-gray-100"
                            >
                                <p className="font-medium">{u.username}</p>
                                <p className="text-sm text-gray-500">{u.email}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm">No users found</p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-4 gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateGroup}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GroupChatModal;

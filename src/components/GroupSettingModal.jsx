import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

//import components
import SearchInput from "./SearchInput";

//context
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";


function GroupSettingsModal({
    isOpen,
    onClose,
    groupName,
    members,
    onSaveName,
    onAddMember,
    onRemoveMember,
    onLeaveGroup,
}) {
    const [newName, setNewName] = useState(groupName);
    const { searchResult, setSearchResult } = useContext(UserContext);

    // keep newName in sync when groupName changes
    useEffect(() => {
        setNewName(groupName);
    }, [groupName]);

    if (!isOpen) {
        return <></>;
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl shadow-lg w-[400px]">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Group Settings</h2>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Edit group name */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Group Name
                    </label>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full border rounded-md p-2"
                    />
                    <button
                        className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
                        onClick={() => onSaveName(newName)}
                    >
                        Save Name
                    </button>
                </div>

                {/* Members list */}
                <div className="mb-4">
                    <ul className="space-y-2">
                        {/* Search & Add Member */}
                        <div className="mb-4 mx-auto">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Add Member
                            </label>
                            <SearchInput /> {/* search input */}
                            {/* Display search results */}
                            <div className="max-h-48 overflow-y-auto mt-2 space-y-2">
                                {searchResult?.map((user) => (
                                    <div
                                        key={user._id}
                                        className="flex justify-between items-center p-2 border rounded-md cursor-pointer hover:bg-blue-50"
                                    >
                                        <span>{user.username}</span>
                                        <button
                                            className="text-green-500 text-sm"
                                            onClick={() => onAddMember(user._id)}
                                        >
                                            Add
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-sm font-semibold mb-2">Members</h3>
                        {members.map((m, index) => (
                            <li
                                key={`${m._id}-${index}`}   // ensures uniqueness
                                className="flex justify-between items-center border p-2 rounded-md"
                            >
                                <span>{m.username}</span>
                                <button
                                    className="text-red-500 text-sm"
                                    onClick={() => onRemoveMember(m._id)}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Leave group */}
                <div className="text-right">
                    <button
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={onLeaveGroup}
                    >
                        Leave Group
                    </button>
                </div>
            </div>
        </div>
    );
}

export default GroupSettingsModal;

import { useState, useEffect } from "react";
import { ArrowLeft, EllipsisVertical } from "lucide-react";
import axios from "axios";

// import components
import GroupSettingsModal from "./GroupSettingModal.jsx";

//context
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";


function Header({ selectedChat, user }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatName, setChatName] = useState(selectedChat.chatName);
    const [members, setMembers] = useState(selectedChat.users);
    const { setSelectedChat } = useContext(UserContext);
   

    // Keep state in sync when selectedChat changes
    useEffect(() => {
        setChatName(selectedChat.chatName);
        setMembers(selectedChat.users);
    }, [selectedChat]);

    const handleSaveName = async (newName) => {
        if (!selectedChat.isGroupChat) return
        if (!selectedChat.groupAdmin) return
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/chat/rename`, {
                chatId: selectedChat._id,
                chatName: newName,
            });

            setChatName(data.chatName || newName);
            setIsModalOpen(false);
        } catch (err) {
            console.error("Error updating group name", err);
        }
    };

    const handleAddMember = async (userId) => {
        if (!selectedChat.isGroupChat) return
        if (!selectedChat.groupAdmin) return
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/chat/group-add`, {
                chatId: selectedChat._id,
                userId,
            });

            setMembers(data.users);
            console.log("Member added successfully");
        } catch (err) {
            console.error("Error adding member", err);
        }
    };

    const handleRemoveMember = async (userId) => {
        if (!selectedChat.isGroupChat || selectedChat.groupAdmin._id !== user._id
) return
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/chat/group-remove`, {
                chatId: selectedChat._id,
                userId: userId,
            });

            // Update members state to remove the user locally
            setMembers((prev) => prev.filter((m) => m._id !== userId));

            if (data.chatName) {
                setChatName(data.chatName);
            }

            console.log(`Removed member ${userId} successfully`);
        } catch (err) {
            console.error("Error removing member", err);
        }
    };

    const handleLeaveGroup = async () => {
        if (!selectedChat.isGroupChat) return
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/chat/group-remove`, {
                chatId: selectedChat._id,
                userId: user._id, 
            });

            console.log("Left group successfully:", data);

            // Close modal after leaving
            setIsModalOpen(false);

        } catch (err) {
            console.error("Error leaving group", err);
            alert(err.response?.data?.message || "Failed to leave group");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm">
                <div className="flex items-center space-x-3">
                    <button
                        className="md:hidden"
                        onClick={() => setSelectedChat(null)}
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h2 className="font-bold text-gray-800">
                            {selectedChat.isGroupChat
                                ? chatName
                                : selectedChat.users.find((u) => u._id !== user._id)?.username}
                        </h2>
                        <p className="text-sm text-gray-500">online</p>
                    </div>
                </div>

                {/* EllipsisVertical opens group settings modal */}
                <button
                    className="hover:cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <EllipsisVertical size={24} />
                </button>
                {/* )} */}
            </div>

            {/* Modal for group settings */}
            <GroupSettingsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                groupName={chatName}
                members={members}
                onSaveName={handleSaveName}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
                onLeaveGroup={handleLeaveGroup}
            />
        </>
    );
}

export default Header;

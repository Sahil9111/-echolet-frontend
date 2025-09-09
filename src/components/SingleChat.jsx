import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import axios from "axios";
import io from 'socket.io-client';

//import componenets
import Header from "./Header.jsx";

//context
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";

let socket;
let selectedChatCompare;

function SingleChat() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDrawer = () => setIsOpen(!isOpen);
    const { selectedChat, user } = useContext(UserContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);

    // Initialize socket
    useEffect(() => {

        // console.log(selectedChat)
        socket = io(import.meta.env.VITE_ENDPOINT);
        socket.emit("setup", user);
        socket.on("connect", () => setSocketConnected(true));

        return () => {
            socket.disconnect(); // cleanup on unmount
        };
    }, [user]);

    // Update selectedChatCompare whenever selectedChat changes
    useEffect(() => {
        selectedChatCompare = selectedChat;
    }, [selectedChat]);

    // Fetch messages when chat changes
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedChat?._id) return;
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/message/${selectedChat._id}`, {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: true,
                });

                setMessages(Array.isArray(data) ? data : data.messages || []);
                socket.emit("join chat", selectedChat._id);
            } catch (error) {
                console.error("Error fetching messages:", error);
                setMessages([]);
            }
        };
        fetchMessages();
    }, [selectedChat, user]);

    // Listen for incoming messages
    useEffect(() => {
        if (!socket) return;

        const messageHandler = (newMessageReceived) => {
            if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id) {
                // Optionally show notification for other chats
            } else {
                setMessages((prev) => [...prev, newMessageReceived]);
            }
        };

        socket.on("messageReceived", messageHandler);

        return () => {
            socket.off("messageReceived", messageHandler);
        };
    }, [selectedChatCompare]);

    // Handle send
    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || !selectedChat?._id) return;

        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/message`,
                { content: input, chatId: selectedChat._id },
                {
                    headers: { Authorization: `Bearer ${user.token}` },
                    withCredentials: true,
                }
            );

            const newMessage = data.message || data;
            setMessages((prev) => [...prev, newMessage]);
            socket.emit("new message", newMessage);
            setInput("");
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="h-screen flex flex-col bg-gray-100">
            {selectedChat ? (
                <>
                    {/* Header */}
                    <Header
                        selectedChat={selectedChat}
                        user={user}
                        toggleDrawer={toggleDrawer}
                    />

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {messages.map((msg, index) => (
                            <div
                                key={msg._id || index}
                                className={`flex ${msg?.sender?._id === user._id ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`px-4 py-2 rounded-2xl max-w-xs ${msg?.sender?._id === user._id
                                        ? "bg-blue-600 text-white rounded-br-none"
                                        : "bg-white text-gray-800 shadow rounded-bl-none"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <form onSubmit={handleSend} className="flex items-center p-3 bg-white border-t sticky bottom-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type a message"
                            className="flex-1 px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                        <button type="submit" className="ml-3 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                            <Send size={20} />
                        </button>
                    </form>
                </>
            ) : (
                <div className="hidden md:flex flex-1 items-center justify-center text-gray-400">
                    Select a chat to start messaging
                </div>
            )}
        </div>
    );
}

export default SingleChat;

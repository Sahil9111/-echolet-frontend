import { useEffect } from "react";
import axios from "axios";

//import components
import SideDrawer from "./SideDrawer";
import SearchInput from "./SearchInput";
import GroupChatModal from "./GroupChatModal";

//context
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";


function Sidebar() {


    const { searchResult, chat, setChat, selectedChat, setSelectedChat, user, isModalOpen, setIsModalOpen } = useContext(UserContext)

    const fetchChats = async () => {

        try {
            const { data } = await axios.get(`/api/chat/`, {
                headers: { "Content-Type": "application/json" },
            });

            console.log({ "Chats fetched": data });
            setChat(data);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    const accessChat = async (userId) => {
        try {
            const { data } = await axios.post(`/api/chat/`, { userId }, {
                headers: { "Content-Type": "application/json" },
            });
            if (data && data._id && !chat.find((c) => c._id === data._id)) {
                setChat([data, ...chat]);
            }

            console.log({ "Chats accessed": data });
            setSelectedChat(data);
        } catch (error) {
            console.error("Error accessing chats:", error);
        }
    }
    const getSender = (loggedInUser, users) => {
        return users[0]._id === loggedInUser._id ? users[1] : users[0];
    };

    useEffect(() => {
        console.log(chat)
        fetchChats()
    }, [])



    return (
        <div className="w-full md:w-72 bg-white shadow-right-md flex flex-col">
            <div className="flex items-center  pr-8">
                <SideDrawer />
                <SearchInput />
            </div>

            {/* Chat list */}
            <div className="p-4 space-y-3 flex-1 overflow-y-auto z-10 bg-white shadow-right ">
                {/* If search has results, show them */}
                {searchResult?.length > 0 ? (
                    searchResult.map((u) => (
                        <div
                            key={u._id}
                            className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer"
                            onClick={() => accessChat(u._id)}
                        >
                            <img
                                src={u.profileImage || "/default-avatar.png"}
                                alt={u.username}
                                className="w-10 h-10 rounded-full object-cover border"
                            />
                            <div>
                                <p className="font-medium text-gray-800">{u.username}</p>
                                <p className="text-sm text-gray-500 truncate">{u.email}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    
                    chat
                        ?.filter((c) => c && c._id && (c.isGroupChat || (c.users && c.users.length > 0)))
                        .map((c) => {
                            const friend = !c.isGroupChat ? getSender(user, c.users) : null;

                            return (
                                <div
                                    key={c._id}
                                    onClick={() => setSelectedChat(c)}
                                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer 
          ${selectedChat?._id === c._id ? "bg-blue-100" : "bg-blue-50"} 
          hover:bg-blue-100`}
                                >
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {c.isGroupChat ? c.chatName : friend?.username}
                                        </p>
                                        <p className="text-sm text-gray-500 truncate">
                                            {c.isGroupChat ? "Group chat" : friend?.email}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                )}

                {/* Group chat modal */}
                <GroupChatModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>

        </div>
    )
}

export default Sidebar
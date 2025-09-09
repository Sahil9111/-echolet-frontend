//import components
import Sidebar from "../components/Sidebar";
import SingleChat from "../components/SingleChat.jsx";

//context
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";


function ChatPage() {
  const { selectedChat } = useContext(UserContext);


  return (
    <div className="h-screen flex bg-gray-100 w-full">

      <div className={`${selectedChat ? "hidden" : "flex"} md:flex w-full md:w-72 bg-white flex-col`}>
        <Sidebar />
      </div>

      <div className={`${selectedChat ? "flex" : "hidden"} md:flex flex-1 flex-col bg-gray-50`}>
        <SingleChat />
      </div>

    </div>
  );
}

export default ChatPage;

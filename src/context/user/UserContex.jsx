// src/context/user/UserContext.jsx
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initialize user from localStorage if available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchResult, setSearchResult] = useState([])
  const [chat, setChat] =useState([])
  const [selectedChat, setSelectedChat] =useState()
  const [fetchedFriendChats, setFetchedFriendChats] =useState([])
  const [activeChatContext, setActiveChatContext] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [search, setSearch] = useState(null)

  // Whenever user changes, save to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Login function
  const login = (userData) => {
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout, search, setSearch, searchResult, setSearchResult, activeChatContext, setActiveChatContext, chat, setChat, fetchedFriendChats, setFetchedFriendChats, selectedChat, setSelectedChat, isModalOpen, setIsModalOpen}}>
      {children}
    </UserContext.Provider>
  );
};

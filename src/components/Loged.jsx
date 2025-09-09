import React from 'react'
import { useState } from 'react';
import Sidebar from "../components/Sidebar";

function Loged() {
    const [activeChat, setActiveChat] = useState(null);
  return (
    <>
    <Sidebar activeChat={activeChat} setActiveChat={setActiveChat} />
    </>
  )
}

export default Loged
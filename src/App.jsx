import './App.css'
import { Routes, Route } from "react-router-dom";

//pages
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'

//components
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import SideDrawer from './components/SideDrawer';
import CreateGrp from './components/Authentication/CreateGrp';
import Loged from './components/Loged.jsx'

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="/chat" Component={ChatPage} />
        {/* <Route path="/loged" Component={Loged} /> */}
        {/* <Route path="/create" Component={CreateGrp} /> */}
      </Routes>
    </div>
  );
}

export default App

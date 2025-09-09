import { useState } from "react";
import { Menu, X } from "lucide-react";

//import components
import UserIcon from "./UserIcon";

//context
import { useContext } from "react";
import { UserContext } from "../context/user/UserContex.jsx";

function SideDrawer() {
  const { setIsModalOpen } = useContext(UserContext)
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div>
      {/* Button to open drawer */}
      <button
        onClick={toggleDrawer}
        className="p-2 text-gray-700 hover:text-blue-600"
      >
        <Menu size={28} />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={toggleDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <UserIcon />
          <button
            onClick={toggleDrawer}
            className="text-gray-600 hover:text-red-500"
          >
            <X size={24} />
          </button>
        </div>
        {/* <SearchInput /> */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div
            className={`flex w-full items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-blue-100`}
            onClick={() => {setIsModalOpen(true);
              toggleDrawer();}
            }
          >New Group</div>
        </div>
      </div>
    </div>
  );
}

export default SideDrawer;

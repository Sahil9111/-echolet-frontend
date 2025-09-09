import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="text-xl font-bold text-blue-600">
                        MyLogo
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6">
                        <Link to="/" className="text-gray-700 hover:text-blue-600">
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600">
                            About
                        </Link>
                        <Link to="/services" className="text-gray-700 hover:text-blue-600">
                            Services
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600">
                            Contact
                        </Link>
                        <Link to="/login" className="text-gray-700 hover:text-blue-600">
                            Login
                        </Link>
                        <Link to="/signup" className="text-gray-700 hover:text-blue-600">
                            Signup
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="flex flex-col space-y-2 px-4 py-3">
                        <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                            Home
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                            About
                        </Link>
                        <Link to="/services" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                            Services
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-blue-600" onClick={() => setIsOpen(false)}>
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;

/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { navlinks } from "../../data";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const loginLogout = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      alert("you have loggedOut");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left: Logo */}
      <div className="flex items-center">
        <img src="/your-logo.png" alt="Logo" className="h-8 w-auto" />
        <span className="text-white font-bold ml-2">Your Company</span>
      </div>

      {/* Right: Menu & Login/Logout (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="flex space-x-4">
          {" "}
          {/* Navigation Links */}
          <ul className="flex ">
            {navlinks?.map((item, idx) => (
              <li
                key={idx}
                className="py-2 px-5 text-white hover:text-gray-300"
              >
                {" "}
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
            <li>
              {/* Conditional Login/Logout */}
              {localStorage.getItem("token") ? (
                <>
                  <Link
                    to={`/${user.role}/dashboard`}
                    className="py-2 px-5 text-white hover:text-gray-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={loginLogout}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={loginLogout}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Hamburger Menu & Login/Logout (Mobile) */}
      <div className="md:hidden flex items-center space-x-2">
        {/* Hamburger Menu */}
        <button
          className="text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />{" "}
            {/* Conditional icon */}
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 right-0 w-full bg-gray-800 z-10">
          {" "}
          {/* Adjust top position as needed */}
          <div className="flex flex-col space-y-4 p-4">
            <ul>
              {navlinks?.map((item, idx) => (
                <li key={idx} className="text-gray-300 hover:text-white">
                  {" "}
                  <Link to={item.link}>{item.name}</Link>
                </li>
              ))}
            </ul>
            {token ? (
              <>
                <Link
                  to={`/${user.role}/dashboard`}
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </Link>
                <button
                  onClick={loginLogout}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

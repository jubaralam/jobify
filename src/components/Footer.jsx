import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto  px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-xl font-bold">Jobify</h2>
          <p className="text-sm">Connecting Talent with Opportunity</p>
        </div>

        <div className="flex space-x-4">
          <Link
            to="/about"
            className="hover:text-blue-400 transition duration-300"
          >
            About Us
          </Link>
          <Link
            to="/jobs"
            className="hover:text-blue-400 transition duration-300"
          >
            Jobs
          </Link>
          <Link
            to="/contact"
            className="hover:text-blue-400 transition duration-300"
          >
            Contact
          </Link>
          <Link
            to="/privacy-policy"
            className="hover:text-blue-400 transition duration-300"
          >
            Privacy Policy
          </Link>
        </div>

        <div className="text-sm mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Jobify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

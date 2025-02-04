import React from "react";
import { motion } from "framer-motion";
import { Briefcase, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-white via-gray-50 to-blue-50 py-20 flex flex-col justify-center items-center h-[calc(100vh-64px)] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-white bg-[url('https://www.toptal.com/designers/subtlepatterns/patterns/double-bubble-outline.png')] opacity-20"></div>

      <div className="container mx-auto text-center relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight"
        >
          Connecting Talent with Opportunity
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-xl text-gray-600 mb-8 italic"
        >
          Find the perfect job or the perfect candidate—right here.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex justify-center space-x-4"
        >
          <Link to="/jobs">
            <button className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-300">
              <Briefcase size={20} /> Find a Job
            </button>
          </Link>
          <Link to="/dashboard/recruiter/post-job">
            <button className="flex items-center gap-2 bg-green-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-green-600 transition duration-300">
              <UserPlus size={20} /> Post a Job
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

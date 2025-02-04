import React from "react";
import Card from "./Card";
import { motion } from "framer-motion";

const RecentJobPosts = () => {
  Card;
  return (
    <div className="w-full h-screen bg-gray-200">
      <h1>Recent Job Posts</h1>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-4 leading-tight"
      >
        Recent Job Posts
      </motion.h1>
      <div>
        <Card />
      </div>
    </div>
  );
};

export default RecentJobPosts;

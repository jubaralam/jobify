import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="flex items-center justify-center  ">
      <motion.div
        className="w-10 h-10 border-t-4 border-blue-500  rounded-full animate-spin "
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        // transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      ></motion.div>
    </div>
  );
};

export default Loading;

import React from 'react';
import { motion } from 'framer-motion';

const Error = ({ message }) => {
  return (
    <motion.div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md mx-auto mt-4 shadow-md"
      role="alert"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </motion.div>
  );
};



export default Error
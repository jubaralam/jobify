import React from 'react'
import { motion } from 'framer-motion';
import {  MapPin, DollarSign } from 'lucide-react';
const Card = () => {
  return (
   <>
    <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 1.5, duration: 0.8 }} 
          className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Frontend Developer</h2>
          <p className="text-gray-600 mb-4">Join our dynamic team to build modern web applications.</p>

          <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
            <div className="flex items-center gap-1">
              <MapPin size={16} /> <span>Remote</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign size={16} /> <span>$60,000 - $80,000/year</span>
            </div>
          </div>

          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            Apply Now
          </button>
        </motion.div>
   </>
  )
}

export default Card
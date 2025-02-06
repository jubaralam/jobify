import React from "react";
import { motion } from "framer-motion";
import { MapPin, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Card = ({
  delay,
  _id,
  job_title,
  job_category,
  job_description,
  job_status,
  application_deadline,
  education_required,
  job_type,
  posted_date,
  required_experience,
  salary_range,
  skills_required,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: `0.${delay}`, duration: 0.8 }}
        className="max-w-sm mx-auto mt-10 bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{job_title}</h2>

        <p className="text-gray-600 mb-4">
          {job_description.split(" ").slice(0, 20).join(" ")}
          {job_description.split(" ").length > 20 && "..."}
        </p>

        <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
          <div className="flex items-center gap-1">
            <MapPin size={16} /> <span>{job_type}</span>
          </div>
          <div className="flex items-center gap-1">
            <DollarSign size={16} /> <span>{salary_range}/year</span>
          </div>
        </div>
        <motion.div className="div flex ">
          <button
            onClick={() => navigate(`/job-details/${_id}`)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            View details
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Card;

/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RecruiterJobCard = ({ job }) => {
  console.log(job);
  const navigate = useNavigate();

  const handleRedired = (id) => {
    navigate(`/recruiter/job/${id}`);
  };
  return (
    <motion.div
      onClick={() => handleRedired(job._id)}
      className="w-[350px] m-4 border border-gray-300 rounded-lg p-4 shadow-md bg-white hover:shadow-lg transition duration-300"
      whileHover={{ scale: 1.02 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800">{job.job_title}</h2>
      <p className="text-sm text-gray-600 mt-1">{job.job_description}</p>
      <div className="mt-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">Type:</span> {job.job_type}
        </p>
        <p>
          <span className="font-semibold">Salary:</span> {job.salary_range}
        </p>
        <p>
          <span className="font-semibold">Applicants:</span>{" "}
          {job.totalApplicants ? job.totalApplicants : "NA"}
        </p>
      </div>
      <p
        className={`mt-2 text-sm font-semibold ${
          job.job_status === "Open" ? "text-green-600" : "text-red-600"
        }`}
      >
        {job.job_status}
      </p>
    </motion.div>
  );
};

export default RecruiterJobCard;

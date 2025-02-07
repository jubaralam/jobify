import { useState, useEffect } from "react";
import { FiUsers, FiBriefcase, FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../components/Loading";
import RecruiterJobCard from "../components/RecruiterJobCard";

const RecruiterDashboard = () => {
  const [flag, setFlag] = useState(true);
  const token = localStorage.getItem("token");
  const [dashboardData, setDashboardData] = useState({
    totalJobs: 0,
    totalApplicants: 0,
    companyName: "",
  });

  const getData = async () => {
    try {
      const res = await axios.get(
        `https://jobify-1q5f.onrender.com/api/job/get-applicants/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.data[0]);
      setDashboardData(res.data.data[0]);
      setFlag(false);
    } catch (error) {
      setFlag(false);
      console.log(error);
      // alert(error.response.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">
        Welcome, {dashboardData.companyName}
      </h2>
      {flag ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Jobs Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
          >
            <FiBriefcase className="text-4xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold">Total Jobs</h3>
              <p className="text-2xl font-bold">{dashboardData.totalJobs}</p>
            </div>
          </motion.div>

          {/* Total Applicants Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
          >
            <FiUsers className="text-4xl text-green-500" />
            <div>
              <h3 className="text-lg font-semibold">Total Applicants</h3>
              <p className="text-2xl font-bold">
                {dashboardData.totalApplicants}
              </p>
            </div>
          </motion.div>

          {/* Settings Card */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4"
          >
            <FiSettings className="text-4xl text-gray-500" />
            <div>
              <h3 className="text-lg font-semibold">Settings</h3>
              <button className="mt-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">
                Manage Profile
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex  flex-wrap max-w-7xl m-4 p-4 justify-center ">
        <h2 className="text-2xl font-semibold">All Jobs</h2>
        <div className="flex flex-wrap max-w-7xl m-4 p-4 justify-center">
          {dashboardData.jobs?.map((job) => (
            <RecruiterJobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;

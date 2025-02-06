import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loading from "../components/Loading";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../components/Error";

const JobDetails = () => {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const [flag, setFlag] = useState(true);
  const [job, setJob] = useState([]);

  const getJob = async () => {
    try {
      const res = await axios.get(
        `https://jobify-1q5f.onrender.com/api/job/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res);
      setJob(res.data.data);
      setFlag(false);
    } catch (error) {
      console.log(error.response.data.message);
      setFlag(false);
      setError(error.response.data.message);
    }
  };
  const {
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
    recruiter_id,
  } = job;

  const navigate = useNavigate();
  const handleApplyJob = async () => {
    if (!token) {
      return navigate("/login");
    }
    const payload = { job_id: _id, recruiter_id, job_title };
    try {
      const res = await axios.post(
        `https://jobify-1q5f.onrender.com/api/job-application/apply`,
        payload,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("responsejjj", res);
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
      setError(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
  useEffect(() => {
    getJob();
  }, [id]);

  if (error) {
    return <Error message={error} />;
  }
  return (
    <div className="bg-gray-50 w-full min-h-screen py-5">
      {flag ? (
        <Loading />
      ) : (
        <motion.div
          className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{job_title}</h1>
          <p className="text-gray-600 mb-6">{job_description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="font-semibold text-gray-700">Job Type:</h2>
              <p>{job_type}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Salary Range:</h2>
              <p>{salary_range}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">
                Required Experience:
              </h2>
              <p>{required_experience}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">
                Education Required:
              </h2>
              <p>{education_required}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Job Category:</h2>
              <p>{job_category}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">
                Application Deadline:
              </h2>
              <p>{new Date(application_deadline).toLocaleDateString()}</p>
            </div>
            <div>
              <h2 className="font-semibold text-gray-700">Job Status:</h2>
              <p>{job_status}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="font-semibold text-gray-700">Skills Required:</h2>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills_required.map((skill, index) => (
                <li
                  key={index}
                  className="bg-blue-200 text-blue-800 px-3 py-1 rounded-xl text-sm"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <motion.button
            onClick={handleApplyJob}
            className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default JobDetails;

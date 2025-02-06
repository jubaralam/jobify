import React, { useEffect, useState } from "react";
import Card from "./Card";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "./Loading";

const RecentJobPosts = () => {
  const [recentJobs, setRecentJobs] = useState([]);
  const [flag, setFlag] = useState(true);
  const getRecentJobs = async () => {
    try {
      const res = await axios.get(
        `https://jobify-1q5f.onrender.com/api/job/recent-post/`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res);
      setRecentJobs(res.data.data);
      setFlag(false);
    } catch (error) {
      console.log(error.message);
      setFlag(false);
    }
  };

  useEffect(() => {
    getRecentJobs();
  }, []);
  console.log(recentJobs);
  return (
    <div className=" mx-auto min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto ">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl  w-full md:text-2xl font-extrabold text-gray-800  py-5 leading-tight  text-center uppercase"
        >
          Recent Job Posts
        </motion.h1>

        {flag ? (
          <Loading />
        ) : (
          <motion.div className="flex flex-wrap py-7">
            {recentJobs?.map((job,idx) => (
              <Card delay={(idx / 0.5/0.5)} key={job._id} {...job} />
            ))}
           
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RecentJobPosts;

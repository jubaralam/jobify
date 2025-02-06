/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../components/Loading";
import Error from "../components/Error";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [flag, setFlag] = useState(true);
  const [pagination, setPagination] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [lastPage, setLastPage] = useState(false);
  const getJobs = async () => {
    try {
      const res = await axios.get(
        `https://jobify-1q5f.onrender.com/api/job/?page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res);
      setJobs(res.data.data);
      setPagination(res.data.meta);
      setFlag(false);
    } catch (error) {
      console.log(error.message);
      setFlag(false);
      setError(error.message);
    }
  };
  const increasePageNo = () => {
    if (page < pagination.totalPages) {
      setPage((prev) => prev + 1);
      //   setLastPage(false);
    }
    // if (page == pagination.totalPages) {
    //   setLastPage(true);
    // }
  };
  const decreasePageNo = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    getJobs();
  }, [page]);

  if (error) {
    return <Error message={error} />;
  }
  return (
    <div className=" mx-auto min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto ">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-2xl  w-full md:text-2xl font-extrabold text-gray-800  py-5 leading-tight  text-center uppercase"
        >
          Job
        </motion.h1>

        {flag ? (
          <Loading />
        ) : (
          <motion.div className="flex flex-wrap py-7">
            {jobs?.map((job, idx) => (
              <Card delay={idx / 0.5 / 0.5} key={job._id} {...job} />
            ))}
          </motion.div>
        )}
      </div>
      <motion.div className="div flex items-center justify-center  py-10">
        <button
          disabled={page == 1}
          onClick={decreasePageNo}
          className={` bg-blue-600 text-white py-2 px-4 mx-4 rounded-md hover:bg-blue-700 transition duration-300 ${
            page == 1 ? "bg-gray-600" : "bg-blue-600"
          }`}
        >
          Prev -
        </button>
        <p className="text-2xl mx-4">{page}</p>
        <button
          disabled={page == pagination.totalPages}
          onClick={increasePageNo}
          className={` bg-blue-600 text-white py-2 px-4 mx-4 rounded-md hover:bg-blue-700 transition duration-300 ${
            page == pagination.totalPages ? "bg-gray-600" : "bg-blue-600"
          }`}
        >
          Next +
        </button>
      </motion.div>
    </div>
  );
};

export default Jobs;

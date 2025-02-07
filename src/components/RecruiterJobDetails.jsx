/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RecruiterJobDetails = () => {
  const token = localStorage("token");
  const { id } = useParams();

  const getJob = async (id) => {
    try {
      const res = await axios.get(
        `https://jobify-1q5f.onrender.com/api/job/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJob(id);
  }, [id]);
  return <div>RecruiterJobDetails id:{id}</div>;
};

export default RecruiterJobDetails;

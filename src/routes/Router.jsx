/* eslint-disable no-unused-vars */
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import JobSeekerLogin from "../pages/JobSeekerLogin";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job-details" element={<JobDetails />} />
      <Route path="/login" element={<JobSeekerLogin />} />
    </Routes>
  );
};

export default Router;

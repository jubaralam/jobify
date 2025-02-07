/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import Jobs from "../pages/Jobs";
import JobSeekerApplications from "../pages/JobSeekerApplications";
import JobSeekerDashboard from "../pages/JobSeekerDashboard";
import JobSeekerLogin from "../pages/JobSeekerLogin";
import JobSeekerProfile from "../pages/JobSeekerProfile";

import RecruiterDashboard from "../pages/RecruiterDashboard";
import RecruiterProfile from "../pages/RecruiterProfile";

import PrivateRoute from "./PrivateRoute";
import JobsPosted from "../pages/JobsPosted";
import JobSeekerRegistration from "../pages/JobSeekerRegistration";
import RecruiterLogin from "../pages/RecruiterLogin";
import RecruiterRegistration from "../pages/RecruiterRegistration";
import RecruiterJobDetails from "../components/RecruiterJobDetails";
const Router = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/job-details/:id" element={<JobDetails />} />
      <Route path="/login" element={<JobSeekerLogin />} />
      <Route path="/recruiter/login" element={<RecruiterLogin />} />
      <Route path="/recruiter/register" element={<RecruiterRegistration />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/register" element={<JobSeekerRegistration />} />

      {/* Protecting Job Seeker Pages */}

      <Route
        path="/jobseeker/dashboard"
        element={
          <PrivateRoute allowedRoles={["jobseeker"]}>
            <JobSeekerDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobseeker/applications"
        element={
          <PrivateRoute allowedRoles={["jobseeker"]}>
            <JobSeekerApplications />
          </PrivateRoute>
        }
      />
      <Route
        path="/jobseeker/profile"
        element={
          <PrivateRoute allowedRoles={["jobseeker"]}>
            <JobSeekerProfile />
          </PrivateRoute>
        }
      />

      {/* Protecting Recruiter Pages */}

      <Route
        path="/recruiter/dashboard"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/profile"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <RecruiterProfile />
          </PrivateRoute>
        }
      />
    
      <Route
        path="/recruiter/posted-jobs"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <JobsPosted />
          </PrivateRoute>
        }
      />
      <Route
        path="/recruiter/job/:id"
        element={
          <PrivateRoute allowedRoles={["recruiter"]}>
            <RecruiterJobDetails />
          </PrivateRoute>
        }
      />
      {/* <Route element={<PrivateRoute allowedRoles={["recruiter"]} />}>
        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs-posted" element={<JobsPosted />} />
      </Route> */}
    </Routes>
  );
};

export default Router;

import { useEffect, useState } from "react";

import DashboardNavbar from "../components/DashboardNavbar";
import JobCard from "../components/JobCard";
import axios from "axios";
import Loading from "../components/Loading";

const JobSeekerDashboard = () => {
  const token = localStorage.getItem("token");
  const [flag, setFlag] = useState(true);
  const [jobList, setJobList] = useState([]);

  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [filteredJobs, setFilteredJobs] = useState();

  const getJobsData = async () => {
    try {
      const res = await axios.get(
        `https://jobify-1q5f.onrender.com/api/job-application/applied`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response", res.data);
      setJobList(res.data.data);

      setFlag(false);
      setFlag(false);
    } catch (error) {
      setFlag(false);
      console.log(error.message);
      setFlag(false);
    }
  };

  useEffect(() => {
    getJobsData();
  }, []);
  useEffect(() => {
    const filteringJobs = jobList.filter(
      (job) => job.status.toLowerCase() === currentStatus.toLowerCase()
    );

    setFilteredJobs(filteringJobs);
  }, [currentStatus, jobList]);

  return (
    <div className="bg-gray-100 w-full h-screen">
      <div className="max-w-7xl mx-auto py-5">
        <DashboardNavbar
          setFilterStatus={setCurrentStatus}
          currentStatus={currentStatus}
        />
      </div>

      <div className="p-6 flex flex-wrap max-w-7xl  mx-auto  ">
        {flag ? (
          <div className="w-full flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          filteredJobs?.map((job, index) => <JobCard key={index} {...job} />)
        )}
      </div>
    </div>
  );
};

export default JobSeekerDashboard;

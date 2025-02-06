const JobCard = ({ job_title, status }) => {
    // Status color mapping
    const statusColors = {
      Pending: "bg-yellow-500",
      Reviewed: "bg-blue-500",
      Shortlisted: "bg-green-500",
      Rejected: "bg-red-500",
      Hired: "bg-purple-500",
    };
  
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 flex justify-between items-center w-80">
        {/* Job Title */}
        <h2 className="text-lg font-semibold text-gray-800">{job_title}</h2>
  
        {/* Status Badge */}
        <span
          className={`text-white px-3 py-1 rounded-full text-sm ${
            statusColors[status] || "bg-gray-500"
          }`}
        >
          {status}
        </span>
      </div>
    );
  };
  
  export default JobCard;
  
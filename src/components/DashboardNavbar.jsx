import { useNavigate } from "react-router-dom";

const DashboardNavbar = ({ setFilterStatus, currentStatus }) => {
  const tabs = ["Pending", "Reviewed", "Shortlisted", "Rejected", "Hired"];
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center  rounded-2xl  ">
      <ul className="flex space-x-6 flex-wrap">
        {tabs.map((tab) => (
          <li key={tab}>
            <button
              onClick={() => setFilterStatus(tab)}
              className={`px-4 py-2 rounded-lg text-gray-700 font-medium transition-all ${
                currentStatus === tab
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          </li>
        ))}
      </ul>
      <div className="bg-blue-600 py-2 px-4 rounded-xl">
        <button
          onClick={() => navigate("/jobseeker/profile")}
          className="text-white font-semibold text-xl"
        >
          Profile
        </button>
      </div>
    </nav>
  );
};

export default DashboardNavbar;

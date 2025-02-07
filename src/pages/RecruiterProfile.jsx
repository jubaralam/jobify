import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const RecruiterProfile = () => {
  const [token, setToken] = useState(null);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    company_logo: "https://example.com/technova-logo.png",
    company_name: "TechNova Solutions",
    description:
      "TechNova Solutions is an innovative software development company specializing in AI, cloud computing, and enterprise solutions.",
    email: "amit.verma@technova.com",
    industry: "Software Development",
    location: "Bangalore, India",
    phone_no: "+91 9876543210",
    recruiter_name: "Amit Verma",
    team_size: "250",
    verified_status: false,
    website_url: "https://www.technova.com",
    social_media: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/company/technova",
      },
      { platform: "Twitter", url: "https://twitter.com/technova" },
    ],
  });

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) setToken(storedToken);
    if (storedUser) setProfile(JSON.parse(storedUser));
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const updateProfile = async () => {
    if (!profile || !profile._id) {
      console.log("Profile data is missing");
      return;
    }
    setFlag(true);
    try {
      const res = await axios.put(
        `https://jobify-1q5f.onrender.com/api/recruiter/update/${profile._id}`,
        { ...profile }, // <-- Spread profile instead of nesting it
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data.message);
      alert(res.data.message);
      setIsEditing(false); // Disable edit mode after update
      setFlag(false);
    } catch (error) {
      setFlag(false);
      console.log(error.message);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const res = await axios.delete(
        `https://jobify-1q5f.onrender.com/api/recruiter/delete/${profile._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(res.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      alert(error.respose.message);
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg ">
      <div className="flex items-center justify-between ">
        <motion.img
          src={profile.company_logo}
          alt={profile.company_name}
          className="w-10 h-10 rounded-full border text-center my-auto"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          onClick={() => {
            if (isEditing) updateProfile();
            setIsEditing(!isEditing);
          }}
        >
          {isEditing ? flag ? <Loading /> : "Save" : "Edit"}
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {Object.entries(profile).map(
          ([key, value]) =>
            key !== "company_logo" &&
            key !== "social_media" && (
              <div key={key} className="flex flex-col">
                <label className="text-gray-700 font-semibold capitalize">
                  {key.replace("_", " ")}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name={key}
                    value={value}
                    onChange={handleChange}
                    className="border rounded p-2 mt-1"
                  />
                ) : (
                  <p className="text-gray-600">{value}</p>
                )}
              </div>
            )
        )}
        <div>
          <label className="text-gray-700 font-semibold">Social Media</label>
          <div className="flex space-x-4 mt-1">
            {profile.social_media.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {link.platform}
              </a>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={handleDeleteProfile}
        className="my-5 px-3 py-2 bg-gray-600 w-auto rounded-2xl text-white"
      >
        Delete profile
      </button>
    </div>
  );
};

export default RecruiterProfile;

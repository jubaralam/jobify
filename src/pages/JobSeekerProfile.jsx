import { useState, useEffect } from "react";
import { FaEdit, FaGithub, FaExternalLinkAlt, FaSave } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdWork } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
const JobSeekerProfile = () => {
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    setUser(storedUser);
    setUpdatedUser(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (section, index, field, value) => {
    setUpdatedUser((prev) => {
      const updatedSection = [...prev[section]];
      updatedSection[index][field] = value;
      return { ...prev, [section]: updatedSection };
    });
  };

  const handleSave = async () => {
    setFlag(true);
    try {
      const res = await axios.put(
        `https://jobify-1q5f.onrender.com/api/jobseeker/update/${user._id}`,
        updatedUser,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFlag(false);
      alert(res.data.message);
    } catch (error) {
      setFlag(false);
      alert(error.message);
    }
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const deleteProfile = async () => {
    setFlag(true);
    try {
      const res = await axios.delete(
        `https://jobify-1q5f.onrender.com/api/jobseeker/delete/${user._id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setFlag(false);
      alert(res.data.message);
    } catch (error) {
      setFlag(false);
      alert(error.message);
    }

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      {/* Header Section */}
      <div className="flex justify-between items-center border-b pb-4">
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleChange}
            className="text-2xl font-bold text-gray-800 border p-2 rounded w-full"
          />
        ) : (
          <h1 className="text-2xl font-bold text-gray-800 uppercase">
            {user.name}
          </h1>
        )}
        <button
          className="bg-gray-800 text-white px-4 py-2 mx-4 rounded flex items-center hover:bg-blue-600"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? (
            <FaSave className="mr-2" />
          ) : (
            <FaEdit className="mr-2" />
          )}
          {isEditing ? flag ? <Loading /> : "Update Profile" : "Edit Profile"}
        </button>
      </div>

      {/* Personal Details */}
      <div className="mt-4">
        {["email", "phone_no", "city"].map((field) => (
          <p key={field} className="text-gray-600 flex items-center">
            {field === "email" && <MdEmail className="mr-2" />}
            {field === "phone_no" && <FiPhone className="mr-2" />}
            {field === "city" && <MdLocationOn className="mr-2" />}
            {isEditing ? (
              <input
                type="text"
                name={field}
                value={updatedUser[field]}
                onChange={handleChange}
                className="border p-1 rounded w-full"
              />
            ) : (
              user[field]
            )}
          </p>
        ))}
      </div>

      {/* Education */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Education</h2>
        {updatedUser.education_details.map((edu, index) => (
          <div key={edu._id} className="text-gray-700">
            {isEditing ? (
              <input
                type="text"
                value={edu.degree}
                onChange={(e) =>
                  handleNestedChange(
                    "education_details",
                    index,
                    "degree",
                    e.target.value
                  )
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              edu.degree
            )}
            {" - "}
            {isEditing ? (
              <input
                type="text"
                value={edu.institution}
                onChange={(e) =>
                  handleNestedChange(
                    "education_details",
                    index,
                    "institution",
                    e.target.value
                  )
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              edu.institution
            )}
            {" ("}
            {isEditing ? (
              <input
                type="text"
                value={edu.year_of_passing}
                onChange={(e) =>
                  handleNestedChange(
                    "education_details",
                    index,
                    "year_of_passing",
                    e.target.value
                  )
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              edu.year_of_passing
            )}
            {")"}
          </div>
        ))}
      </div>

      {/* Work Experience */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Work Experience</h2>
        {updatedUser.work_experience.map((exp, index) => (
          <div key={exp._id} className="mt-2">
            <p className="text-gray-700 flex items-center">
              <MdWork className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    handleNestedChange(
                      "work_experience",
                      index,
                      "position",
                      e.target.value
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                exp.position
              )}
              {" at "}
              {isEditing ? (
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleNestedChange(
                      "work_experience",
                      index,
                      "company",
                      e.target.value
                    )
                  }
                  className="border p-1 rounded w-full"
                />
              ) : (
                exp.company
              )}
            </p>
          </div>
        ))}
      </div>

      {/* Skills */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
        <div className="flex flex-wrap mt-2">
          {updatedUser.skills.technical.map((skill, index) =>
            isEditing ? (
              <input
                key={index}
                type="text"
                value={skill}
                onChange={(e) => {
                  const newSkills = [...updatedUser.skills.technical];
                  newSkills[index] = e.target.value;
                  setUpdatedUser((prev) => ({
                    ...prev,
                    skills: { ...prev.skills, technical: newSkills },
                  }));
                }}
                className="border p-1 rounded w-full"
              />
            ) : (
              <span
                key={index}
                className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-sm mr-2 mb-2"
              >
                {skill}
              </span>
            )
          )}
        </div>
      </div>

      {/* Job Preferences */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Job Preferences</h2>
        {["job_type", "preferred_location", "expected_salary"].map((field) => (
          <p key={field} className="text-gray-700">
            {field.replace("_", " ")}:{" "}
            {isEditing ? (
              <input
                type="text"
                name={`job_preferences.${field}`}
                value={updatedUser.job_preferences[field]}
                onChange={(e) =>
                  setUpdatedUser((prev) => ({
                    ...prev,
                    job_preferences: {
                      ...prev.job_preferences,
                      [field]: e.target.value,
                    },
                  }))
                }
                className="border p-1 rounded w-full"
              />
            ) : (
              user.job_preferences[field]
            )}
          </p>
        ))}
      </div>
      <button
        onClick={deleteProfile}
        className="bg-gray-600 text-white px-4 py-3 my-5 mx-4 rounded flex items-center hover:bg-blue-600"
      >
        {flag ? <Loading /> : "Delete Profile"}
      </button>
    </div>
  );
};

export default JobSeekerProfile;

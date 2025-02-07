import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

const RecruiterRegistration = () => {
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    recruiter_name: "",
    email: "",
    password: "",
    phone_no: "",
    company_logo: "",
    website_url: "",
    description: "",
    industry: "",
    location: "",
    team_size: "",
    social_media: [{ platform: "", url: "" }], // Initialize as an array of objects
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle social media input changes
  const handleSocialMediaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedSocialMedia = [...formData.social_media];
    updatedSocialMedia[index][name] = value;
    setFormData({ ...formData, social_media: updatedSocialMedia });
  };

  // Add a new social media field
  const addSocialMediaField = () => {
    setFormData({
      ...formData,
      social_media: [...formData.social_media, { platform: "", url: "" }],
    });
  };

  // Remove a social media field
  const removeSocialMediaField = (index) => {
    const updatedSocialMedia = [...formData.social_media];
    updatedSocialMedia.splice(index, 1);
    setFormData({ ...formData, social_media: updatedSocialMedia });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlag(true);
    setError("");
    console.log(formData);
    try {
      const response = await axios.post(
        "https://jobify-1q5f.onrender.com/api/recruiter/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      alert("Registration Successful");
      setFlag(false);
      navigate("/recruiter/login");
    } catch (err) {
      setFlag(false);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Recruiter Registration</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="company_name"
          placeholder="Company Name"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="recruiter_name"
          placeholder="Recruiter Name"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone Number"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="company_logo"
          placeholder="Company Logo URL"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
        />
        <input
          type="text"
          name="website_url"
          placeholder="Website URL"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Company Description"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        ></textarea>
        <input
          type="text"
          name="industry"
          placeholder="Industry"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />
        <input
          type="text"
          name="team_size"
          placeholder="Team Size"
          onChange={handleChange}
          className="w-full p-2 border mb-2"
          required
        />

        {/* Social Media Inputs */}
        <h3 className="text-lg font-semibold mb-2">Social Media Links</h3>
        {formData.social_media.map((item, index) => (
          <div key={index} className="mb-2 flex gap-2">
            <input
              type="text"
              name="platform"
              placeholder="Platform (e.g., LinkedIn)"
              value={item.platform}
              onChange={(e) => handleSocialMediaChange(index, e)}
              className="w-1/2 p-2 border"
              required
            />
            <input
              type="text"
              name="url"
              placeholder="Profile URL"
              value={item.url}
              onChange={(e) => handleSocialMediaChange(index, e)}
              className="w-1/2 p-2 border"
              required
            />
            {index > 0 && (
              <button
                type="button"
                onClick={() => removeSocialMediaField(index)}
                className="text-red-500"
              >
                ✖
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSocialMediaField}
          className="w-full bg-gray-200 text-black p-2 rounded-md mb-2"
        >
          + Add Social Media
        </button>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white p-2 rounded-md ${
            flag ? "bg-gray-400" : ""
          }`}
        >
          {flag ? <Loading /> : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RecruiterRegistration;

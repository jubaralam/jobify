import axios from "axios";
import { useState, useEffect } from "react";

const JobSeekerRegistration = () => {
  const [formData, setFormData] = useState(
    //   {
    //   name: "",
    //   email: "",
    //   password: "",
    //   phone_no: "",
    //   city: "",
    //   dob: "",
    //   role: "jobseeker",
    //   education_details: [{ degree: "", institution: "", year_of_passing: "" }],
    //   work_experience: [
    //     { position: "", company: "", duration: "", description: "" },
    //   ],
    //   skills: { technical: [], soft: [] },
    //   resume_link: "",
    //   portfolio_link: "",
    //   github_link: "",
    //   job_preferences: {
    //     job_type: [],
    //     preferred_location: "",
    //     expected_salary: "",
    //   },
    // }

    {
      name: "",
      email: "",
      password: "",
      phone_no: "",
      city: "",
      dob: "",
      education_details: [
        {
          degree: "",
          institution: "",
          year_of_passing: "",
        },
      ],
      work_experience: [
        {
          company: "",
          position: "",
          duration: "",
          description: "",
        },
      ],
      skills: {
        technical: [],
        soft: [],
      },
      applied_jobs: [],
      resume_link: "",
      portfolio_link: "",
      github_link: "",
      job_preferences: {
        job_type: [],
        preferred_location: "",
        expected_salary: 0,
      },
    }
  );

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("jobSeekerData"));
    if (storedData) setFormData(storedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (index, field, value, type) => {
    setFormData((prev) => {
      // const updatedArray = [...prev[type]];
      // updatedArray[index][field] = value;
      const updatedArray = prev[type].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );

      return { ...prev, [type]: updatedArray };
    });
  };

  const handleSkillsChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [type]: value.split(",").map((item) => item.trim()),
      },
    }));
  };

  const handleJobPreferencesChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      job_preferences: { ...prev.job_preferences, [field]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
console.log("first", formData)
    try {
      const res = await axios.post(
        `https://jobify-1q5f.onrender.com/api/jobseeker/register`,
        formData
      );
      console.log("registered", res.data);
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
    // localStorage.setItem("jobSeekerData", JSON.stringify(formData));
    // alert("Job Seeker Data Saved Successfully!");

    console.log("last", formData)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Job Seeker Registration</h2>

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border mb-2"
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border mb-2"
      />

      <input
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full p-2 border mb-2"
      />

      <input
        name="phone_no"
        value={formData.phone_no}
        onChange={handleChange}
        placeholder="Phone Number"
        required
        className="w-full p-2 border mb-2"
      />
      <input
        name="city"
        value={formData.city}
        onChange={handleChange}
        placeholder="City"
        required
        className="w-full p-2 border mb-2"
      />
      <input
        name="dob"
        value={formData.dob}
        onChange={handleChange}
        placeholder="date of birth"
        required
        type="date"
        className="w-full p-2 border mb-2"
      />
      <h2 className="text-2xl font-bold mb-4">Links</h2>

      <input
        name="resume_link"
        value={formData.resume_link}
        onChange={handleChange}
        placeholder="resume link"
        required
        className="w-full p-2 border mb-2"
      />
      <input
        name="portfolio_link"
        value={formData.portfolio_link}
        onChange={handleChange}
        placeholder="portfolio link"
        required
        className="w-full p-2 border mb-2"
      />

      <input
        name="github_link"
        value={formData.github_link}
        onChange={handleChange}
        placeholder="github link"
        required
        className="w-full p-2 border mb-2"
      />

      {/* Education Details */}
      <h3 className="text-xl font-semibold mt-4">Education</h3>
      {formData.education_details.map((edu, index) => (
        <div key={index} className="mb-2">
          <input
            value={edu.degree}
            onChange={(e) =>
              handleArrayChange(
                index,
                "degree",
                e.target.value,
                "education_details"
              )
            }
            placeholder="Degree"
            className="w-full p-2 border mb-2"
          />
          <input
            value={edu.institution}
            onChange={(e) =>
              handleArrayChange(
                index,
                "institution",
                e.target.value,
                "education_details"
              )
            }
            placeholder="Institution"
            className="w-full p-2 border mb-2"
          />
          <input
            value={edu.year_of_passing}
            onChange={(e) =>
              handleArrayChange(
                index,
                "year_of_passing",
                e.target.value,
                "education_details"
              )
            }
            placeholder="Year of Passing"
            className="w-full p-2 border mb-2"
          />
        </div>
      ))}

      {/* Work Experience */}
      <h3 className="text-xl font-semibold mt-4">Work Experience</h3>
      {formData.work_experience.map((exp, index) => (
        <div key={index} className="mb-2">
          <input
            value={exp.position}
            onChange={(e) =>
              handleArrayChange(
                index,
                "position",
                e.target.value,
                "work_experience"
              )
            }
            placeholder="Position"
            className="w-full p-2 border mb-2"
          />
          <input
            value={exp.company}
            onChange={(e) =>
              handleArrayChange(
                index,
                "company",
                e.target.value,
                "work_experience"
              )
            }
            placeholder="Company"
            className="w-full p-2 border mb-2"
          />
          <input
            value={exp.duration}
            onChange={(e) =>
              handleArrayChange(
                index,
                "duration",
                e.target.value,
                "work_experience"
              )
            }
            placeholder="Duration"
            className="w-full p-2 border mb-2"
          />
          <textarea
            value={exp.description}
            onChange={(e) =>
              handleArrayChange(
                index,
                "description",
                e.target.value,
                "work_experience"
              )
            }
            placeholder="Description"
            className="w-full p-2 border mb-2"
          />
        </div>
      ))}

      {/* Skills */}
      <h3 className="text-xl font-semibold mt-4">Skills</h3>
      <input
        name="technical"
        value={formData.skills.technical.join(", ")}
        onChange={(e) => handleSkillsChange("technical", e.target.value)}
        placeholder="Technical Skills (comma-separated)"
        className="w-full p-2 border mb-2"
      />
      <input
        name="soft"
        value={formData.skills.soft.join(", ")}
        onChange={(e) => handleSkillsChange("soft", e.target.value)}
        placeholder="Soft Skills (comma-separated)"
        className="w-full p-2 border mb-2"
      />

      {/* Job Preferences */}
      <h3 className="text-xl font-semibold mt-4">Job Preferences</h3>
      <input
        name="job_type"
        value={formData.job_preferences.job_type.join(", ")}
        onChange={(e) =>
          handleJobPreferencesChange("job_type", e.target.value.split(", "))
        }
        placeholder="Job Type (comma-separated)"
        className="w-full p-2 border mb-2"
      />
      <input
        name="preferred_location"
        value={formData.job_preferences.preferred_location}
        onChange={(e) =>
          handleJobPreferencesChange("preferred_location", e.target.value)
        }
        placeholder="Preferred Location"
        className="w-full p-2 border mb-2"
      />
      <input
        name="expected_salary"
        value={formData.job_preferences.expected_salary}
        onChange={(e) =>
          handleJobPreferencesChange("expected_salary", Number(e.target.value))
        }
        placeholder="Expected Salary"
        className="w-full p-2 border mb-2"
      />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white mt-4">
        Submit
      </button>
    </form>
  );
};

export default JobSeekerRegistration;

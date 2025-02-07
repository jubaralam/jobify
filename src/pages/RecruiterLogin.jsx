import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const RecruiterLogin = () => {
  const [flag, setFlag] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setFlag(true);
    try {
      const res = await axios.post(
        "https://jobify-1q5f.onrender.com/api/recruiter/login",
        formData
      );
      console.log("recruiter data",res.data.recruiter);

      localStorage.setItem("user", JSON.stringify(res.data.recruiter));
      localStorage.setItem("token", res.data.token);

      alert("Login successful!");
      setFlag(false);
      navigate("/recruiter/dashboard");
    } catch (err) {
      setFlag(false);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Recruiter Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition ${
              flag ? "bg-gray-400" : ""
            }`}
          >
            {flag ? <Loading /> : "Login"}
          </button>
        </form>
        <div className="my-5 text-center">
          <Link
            to="/recruiter/register"
            className="text-xl text-blue-600 py-8 "
          >
            Recruiter Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecruiterLogin;

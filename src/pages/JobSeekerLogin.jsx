import { useState } from "react";
// import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const JobSeekerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const res = await axios.post(
        `https://jobify-1q5f.onrender.com/api/jobseeker/login`,
        payload,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("logged in", res.data.user);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setIsLoggedIn(true);
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }
  };

  const navigate = useNavigate();
  if (isLoggedIn) {
    return navigate("/jobseeker/dashboard");
  }
  return (
    <div className="flex items-center  justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Job Seeker Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-xl transition duration-300"
          >
            Login
          </motion.button>
        </form>
        <div className="flex justify-between my-4 mx-2">
          <Link to="/register" className="text-xl text-blue-600 ">
            Register
          </Link>
          <Link to="/recruiter/login" className="text-xl text-blue-600">
            Recruiter Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default JobSeekerLogin;

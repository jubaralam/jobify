/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import RecentJobPosts from "../components/RecentJobPosts";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <RecentJobPosts />
    </div>
  );
};

export default Home;

/* eslint-disable no-unused-vars */
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import RecentJobPosts from "../components/RecentJobPosts";
import Footer from "../components/Footer";

const Home = () => {
    
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <RecentJobPosts />
      <Footer />
    </div>
  );
};

export default Home;

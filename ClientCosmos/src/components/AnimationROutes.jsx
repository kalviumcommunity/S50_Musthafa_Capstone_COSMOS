import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landingpage from "./Landingpage";
import HomePage from "./HomePage";
import LoginForm from "./Forms/LoginForm";
import SignupForm from "./Forms/SignupForm";
import UserPosts from "./UserPosts";
import Explore from "./Explore";
import Communties from "./Communties";
import Profile from "./Profile";
import { AnimatePresence } from "framer-motion";
import News from "./News";
import Loading from "./Loading";
import About from "./About";
import PostForm from "./Forms/PostForm";
import Community from "./Community/Community";
import SelectedNews from "./SelectedNews";
function AnimationRoutes() {
  const location = useLocation();
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landingpage />} />
        <Route path="/HomePage" element={<HomePage setSelectedNews={setSelectedNews} />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userPosts" element={<UserPosts />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/communities" element={<Communties />} />
        <Route
          path="/news"
          element={<News setSelectedNews={setSelectedNews} />}
        />
        <Route path="/loading" element={<Loading />} />
        <Route path="/about" element={<About />} />
        <Route path="/Postform" element={<PostForm />} />
        <Route path="/community" element={<Community />} />
        <Route
          path="/selenews"
          element={selectedNews && <SelectedNews setSelectedNews={setSelectedNews}  selectedNews={selectedNews} />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimationRoutes;

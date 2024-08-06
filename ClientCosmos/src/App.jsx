import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landingpage from "./components/Landingpage";
import HomePage from "./components/HomePage";
import LoginForm from "./components/Forms/LoginForm";
import SignupForm from "./components/Forms/SignupForm";
import Posts from "./components/Posts/Posts";
import Profile from "./components/Profile/Profile";
import News from "./components/News/News";
import About from "./components/About";
import PostForm from "./components/Forms/PostForm";
import SelectedNews from "./components/News/SelectedNews";
import SolarSystem from "./components/Topics/SolarSystem";
import BlackHoles from "./components/Topics/BlackHoles";
import Nebulas from "./components/Topics/Nebulas";
import Stars from "./components/Topics/Stars";
import Galaxies from "./components/Topics/Galaxies";
import Loading from "./components/Loading/Loading";
import PostComments from "./components/Comment/PostComments";
import Settings from "./components/Settings/Settings";
import UserProfile from "./components/UserProfile/UserProfile";
import Chats from "./components/Chats/Chats";
import CommunityChats from "./components/Chats/CommunityChats";
function App() {
  const location = useLocation();
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landingpage />} />
        {/* chat routes */}
        <Route path="/chats" element={<Chats />} />
        <Route path="/communitychats" element={<CommunityChats />} />

        <Route
          path="/HomePage"
          element={<HomePage setSelectedNews={setSelectedNews} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userprofile/:id" element={<UserProfile />} />

        <Route path="/userPosts" element={<Posts />} />
        <Route path="/postComments" element={<PostComments />} />
        <Route
          path="/news"
          element={<News setSelectedNews={setSelectedNews} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/Postform" element={<PostForm />} />
        <Route
          path="/selenews"
          element={
            selectedNews && (
              <SelectedNews
                setSelectedNews={setSelectedNews}
                selectedNews={selectedNews}
              />
            )
          }
        />
        <Route
          path="/galaxies"
          element={<Galaxies setSelectedNews={setSelectedNews} />}
        />
        <Route
          path="/nebulas"
          element={<Nebulas setSelectedNews={setSelectedNews} />}
        />
        <Route
          path="/stars"
          element={<Stars setSelectedNews={setSelectedNews} />}
        />
        <Route
          path="/blackholes"
          element={<BlackHoles setSelectedNews={setSelectedNews} />}
        />
        <Route
          path="/solarsystem"
          element={<SolarSystem setSelectedNews={setSelectedNews} />}
        />
        <Route />
        <Route path="/loading" element={<Loading />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;

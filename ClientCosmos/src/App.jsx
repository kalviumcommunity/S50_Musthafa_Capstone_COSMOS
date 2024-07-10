import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landingpage from "./components/Landingpage";
import HomePage from "./components/HomePage";
import LoginForm from "./components/Forms/LoginForm";
import SignupForm from "./components/Forms/SignupForm";
import UserPosts from "./components/UserPosts";
import Communties from "./components/Community/Communties";
import Profile from "./components/Profile";
import News from "./components/News/News";
import About from "./components/About";
import PostForm from "./components/Forms/PostForm";
import CommunityJoin from "./components/Community/chat , join and details/CommunityJoin";
import SelectedNews from "./components/News/SelectedNews";
import Earth from "./components/Topics/Earth";
import SolarSystem from "./components/Topics/SolarSystem";
import BlackHoles from "./components/Topics/BlackHoles";
import Nebulas from "./components/Topics/Nebulas";
import Stars from "./components/Topics/Stars";
import Galaxies from "./components/Topics/Galaxies";
import Loading from "./components/Loading/Loading";
import YourCommunity from "./components/Community/sections/YourCommunity";
import AllCommunity from "./components/Community/sections/AllCommunity";
import CommunityChat from "./components/Community/chat , join and details/CommunityChat";
import CommunityDetails from "./components/Community/chat , join and details/CommunityDetails";
import PostComments from "./components/PostComments";
import Communities from "./components/Community/Communties";

function App() {
  const location = useLocation();
  const [selectedNews, setSelectedNews] = useState(null);

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/HomePage"
          element={<HomePage setSelectedNews={setSelectedNews} />}
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userPosts" element={<UserPosts />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communitychat/:id" element={<CommunityChat />} />
        <Route path="/communitydetails/:id" element={<CommunityDetails />} />
        <Route path="/postComments" element={<PostComments />} />
        <Route
          path="/news"
          element={<News setSelectedNews={setSelectedNews} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/Postform" element={<PostForm />} />
        <Route path="/communityjoin/:id" element={<CommunityJoin />} />
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
        <Route
          path="/earth"
          element={<Earth setSelectedNews={setSelectedNews} />}
        />
        <Route path="/loading" element={<Loading />} />
      </Routes>
    </>
  );
}

export default App;

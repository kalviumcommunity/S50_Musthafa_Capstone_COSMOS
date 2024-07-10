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
import CommunityJoin from "./components/Community/chat , join and details/CommunityJoin";
import SelectedNews from "./components/News/SelectedNews";
import Earth from "./components/Topics/Earth";
import SolarSystem from "./components/Topics/SolarSystem";
import BlackHoles from "./components/Topics/BlackHoles";
import Nebulas from "./components/Topics/Nebulas";
import Stars from "./components/Topics/Stars";
import Galaxies from "./components/Topics/Galaxies";
import Loading from "./components/Loading/Loading";
import CommunityChat from "./components/Community/chat , join and details/CommunityChat";
import PostComments from "./components/Comment/PostComments";
import Communities from "./components/Community/Communties";
import Settings from "./components/Settings/Settings";

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
        <Route path="/userPosts" element={<Posts />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/communitychat/:id" element={<CommunityChat />} />
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
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;

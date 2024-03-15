import HomePage from "./components/HomePage";
import Landingpage from "./components/Landingpage";
import LoginForm from "./components/Forms/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/Forms/SignupForm";
import Profile from "./components/Profile";
import UserPosts from "./components/UserPosts";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/userPosts" element={<UserPosts />} />

      </Routes>
    </>
  );
}

export default App;

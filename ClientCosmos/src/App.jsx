import HomePage from "./components/HomePage";
import Landingpage from "./components/Landingpage";
import LoginForm from "./components/Forms/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/Forms/SignupForm";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;

import HomePage from "./components/HomePage";
import Landingpage from "./components/Landingpage";
import LoginForm from "./components/Forms/LoginForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./components/Forms/SignupForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/login" element={<LoginForm />} />{" "}
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </>
  );
}

export default App;

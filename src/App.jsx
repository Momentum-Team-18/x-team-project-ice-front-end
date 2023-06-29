import { useState } from "react";
import "./App.css";
import Home from "./Home";
import Questions from "./Questions";
import Profile from "./Profile";
import Answers from "./Answers";
import { Route, Routes } from "react-router-dom";
import NavBar from "./Navbar";

const App = () => {
  const [token, setToken] = useState("");


  return (
    <>
    <NavBar/>
          <Routes>
            <Route path="/Home" element={<Home updateToken={setToken} />} />
            <Route path="/Profile" element={<Profile token={token} />} />
          </Routes>
        
        <Questions token={token} />
        <Answers token={token} />
    </>
  );
};

export default App;

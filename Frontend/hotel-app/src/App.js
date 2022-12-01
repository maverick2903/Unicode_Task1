import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Protection from "./components/Protection";

function App() {
  const [loginCheck, setLoginCheck] = useState(true);

  return (
    <div className="App">
      <Router>
        <Navbar loginCheck={loginCheck} setLoginCheck={setLoginCheck} />
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/login"
              element={
                <Login loginCheck={loginCheck} setLoginCheck={setLoginCheck} />
              }
            ></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route
              path="/profile"
              element={
                <Protection loginCheck={loginCheck}>
                  <Profile />
                </Protection>
              }
            ></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

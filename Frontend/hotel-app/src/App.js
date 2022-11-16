import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

function App() {
  const navLinkStyle = {
    display: "flex",
  };
  const linkStyle = {
    padding: 20,
    margin: "30px",
  };
  return (
    <>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h4">Hotels</Typography>

            <div className={navLinkStyle}>
              <Link to="/" className={linkStyle}>
                Home
              </Link>
              <Link to="/login" className={linkStyle}>
                Login
              </Link>
              <Link to="/signup" className={linkStyle}>
                Signup
              </Link>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

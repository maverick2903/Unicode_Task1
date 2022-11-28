import React, { useState } from "react";
import { Grid, Paper, Avatar, TextField, Button, Box } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";

function Login({ loginCheck, setLoginCheck }) {
  const navigate = useNavigate();
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 300,
    margin: "30px auto",
  };

  const btnStyle = {
    margin: "20px 0px",
  };

  const textStyle = {
    FontFace: "Roboto Slab",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = async (e) => {
    e.preventDefault();
    const resp = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const info = await resp.json();
    if (resp.status === 401 || !info) {
      window.alert("Invalid username/password");
    } else {
      window.alert("Login Successful");
      localStorage.setItem("jwtoken", info.token);
      setLoginCheck(true);
      navigate("/");
    }
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ bgcolor: "black" }}>
            <LockOpenIcon></LockOpenIcon>
          </Avatar>
          <h2 style={textStyle}>Log In</h2>
        </Grid>
        <form method="POST">
          <Grid>
            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
              <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
              <TextField
                id="input-with-sx"
                label="Username"
                variant="standard"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />
            </Box>
            <TextField
              required
              id="input-with-sx"
              label="Password"
              variant="standard"
              type={"password"}
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            style={btnStyle}
            onClick={handleInput}
          >
            Login
          </Button>
        </form>
        New User? <Link to="/signup">Sign Up now</Link>
      </Paper>
    </Grid>
  );
}

export default Login;

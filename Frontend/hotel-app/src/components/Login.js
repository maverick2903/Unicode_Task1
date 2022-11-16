import React from "react";
import { Grid, Paper, Avatar, TextField, Button, Box } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

function Login() {
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

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ bgcolor: "black" }}>
            <LockOpenIcon></LockOpenIcon>
          </Avatar>
          <h2 style={textStyle}>Log In</h2>
        </Grid>
        <Grid>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="input-with-sx"
              label="Username"
              variant="standard"
              required
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
            fullWidth
          />
        </Grid>
        <Button variant="contained" type="submit" fullWidth style={btnStyle}>
          Login
        </Button>
        New User? <Link to="/signup">Sign Up now</Link>
      </Paper>
    </Grid>
  );
}

export default Login;

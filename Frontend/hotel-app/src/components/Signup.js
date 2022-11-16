import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useForm } from "react-hook-form";

function Signup() {
  const paperStyle = {
    height: "85vh",
    width: 350,
    margin: "10px auto",
    padding: 20,
  };
  const btnStyle = {
    margin: "20px 0px",
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    username: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const { register, handleSubmit } = useForm();
  const submitCheck = (data) => console.log(data);

  const namecheck = {
    label: "varun",
    name: "name",
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <PersonAddIcon fontSize="large" />
          <h2>Sign Up</h2>
          <h4>Enter your details</h4>
        </Grid>
        <form onSubmit={handleSubmit(submitCheck)}>
          <TextField
            id="outlined-basic"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.name}
            onInput={handleInput}
            {...namecheck}
            {...register("name", { required: "Required" })}
          />
          <TextField
            id="outlined-basic"
            label="Email-ID"
            name="email"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            type={"email"}
            fullWidth
            value={user.email}
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            name="phone"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.phone}
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            label="Role"
            name="role"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.role}
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            label="Username"
            name="username"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.username}
            onChange={handleInput}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            name="password"
            variant="standard"
            style={{ marginBottom: 10 }}
            margin="normal"
            type={"password"}
            fullWidth
            value={user.password}
            onChange={handleInput}
          />
          <Button variant="contained" type="submit" fullWidth style={btnStyle}>
            Sign up
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

export default Signup;

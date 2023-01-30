import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GoogleIcon from "@mui/icons-material/Google";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle } from "./FirebaseGoogle";
import backgrnd from "./Content/Signup/backgrnd.jpg";
import { blue } from "@mui/material/colors";

function Signup() {
  const navigate = useNavigate();

  const paperStyle = {
    height: "120vh",
    width: 380,
    margin: "10px auto",
    padding: 20,
    backgroundColor: blue,
  };
  const btnStyle = {
    margin: "20px 0px",
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    username: "",
    password: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitCheck = async (data, e) => {
    e.preventDefault();
    const { name, email, phone, location, role, username, password } = data;
    const resp = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        mobile_no: phone,
        location: location,
        role: role,
        username: username,
        password: password,
      }),
    });

    const info = await resp.json();
    console.log(info.status);
    if (info.status === 200) {
      window.alert("Registration Successful");
      console.log("Registration Successful");
      navigate("/");
    } else {
      window.alert("Registration Failed");
      console.log("Registration Failed");
    }
  };

  return (
    <Grid
      class="backgrnd"
      style={{
        backgroundImage: `url(${backgrnd})`,
        backgroundSize: "cover",
        height: "120vh",
        backgroundColor: blue,
      }}
    >
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <PersonAddIcon fontSize="large" />
          <h2>Sign Up</h2>
          <h4>Enter your details</h4>
        </Grid>
        <form method="POST" onSubmit={handleSubmit(submitCheck)}>
          <TextField
            id="outlined-basic"
            label="Name"
            name="name"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.name}
            onInput={handleInput}
            {...register("name", { required: "Invalid/Empty Input" })}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : null}
          />
          <TextField
            id="outlined-basic"
            label="Email-ID"
            name="email"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.email}
            onInput={handleInput}
            {...register("email", {
              required: "Invalid/Empty Input",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email Address Invalid",
              },
            })}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : null}
            noValidate
          />
          <TextField
            id="outlined-basic"
            label="Phone Number"
            name="phone"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            type={"tel"}
            margin="normal"
            fullWidth
            value={user.phone}
            onInput={handleInput}
            {...register("phone", { required: "Invalid/Empty Input" })}
            error={!!errors.phone}
            helperText={errors.phone ? errors.phone.message : null}
          />
          <TextField
            id="outlined-basic"
            label="Location"
            name="location"
            variant="standard"
            style={{ marginLeft: 0, marginRight: 0 }}
            margin="normal"
            fullWidth
            value={user.location}
            onInput={handleInput}
            {...register("location", { required: "Invalid/Empty Input" })}
            error={!!errors.location}
            helperText={errors.location ? errors.location.message : null}
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
            onInput={handleInput}
            {...register("role", { required: "Invalid/Empty Input" })}
            error={!!errors.role}
            helperText={errors.role ? errors.role.message : null}
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
            onInput={handleInput}
            {...register("username", { required: "Invalid/Empty Input" })}
            error={!!errors.username}
            helperText={errors.username ? errors.username.message : null}
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
            onInput={handleInput}
            {...register("password", { required: "Invalid/Empty Input" })}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : null}
          />
          <Button variant="contained" type="submit" fullWidth style={btnStyle}>
            Sign up
          </Button>
        </form>

        <Grid>
          <h6>OR</h6>
        </Grid>

        <Button
          onClick={() => {
            signInWithGoogle();
            navigate("/");
          }}
          variant="outlined"
          startIcon={<GoogleIcon />}
        >
          Sign In with Google
        </Button>
      </Paper>
    </Grid>
  );
}

export default Signup;

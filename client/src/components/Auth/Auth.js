import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin } from "../../store/authActions";
import { signup } from "../../store/authActions";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData, "formData");
    // debugger;

    if (isSignUp) {
      // debugger;
      await dispatch(signup(formData))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      // debugger;
      await dispatch(signin(formData))
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setFormData(initialState);
    setIsSignUp((prev) => !prev);
    setShowPassword(false);
  };
  const handleGoogleSuccess = (response) => {
    const result = jwtDecode(response?.credential);
    console.log(result, "result");
    const token = result?.sub;
    console.log(token);
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handleGoogleError = (error) => {
    console.log(error);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper
        style={{
          marginTop: "64px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Avatar style={{ margin: "8px", backgroundColor: "#9c27b0" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Typography>
        <form
          onSubmit={handleSubmit}
          style={{ marginTop: "24px", width: "100%" }}
        >
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              type="email"
              handleChange={handleChange}
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ margin: "24px 0px 16px" }}
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            width="100px"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isSignUp
                  ? "Already have an account ? Sign In"
                  : "Don't have an account ? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;

import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import Input from "./input";
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import Alert from "@material-ui/lab/Alert";

const axios = require("axios");

const RegisterScreen = ({ history }) => {
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (Password !== ConfirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords do not match");
    }

    try {
      const { data } = await axios.post(
        "/api/auth/register",
        { username: Username, email: Email, password: Password },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 10000);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Input
                name="username"
                label="Username"
                handleChange={(e) => setUsername(e.target.value)}
                autoFocus
              />

              <Input
                name="email"
                label="Email Address"
                required
                handleChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                required
                handleChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />

              <Input
                name="confirmPassword"
                label="Repeat Password"
                required
                handleChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login">
                  <Button>Already have an account? Sign in</Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterScreen;

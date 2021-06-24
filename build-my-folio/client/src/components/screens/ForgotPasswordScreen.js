import React, { useState } from "react";
import axios from "axios";
import "./ForgotPasswordScreen.css";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import useStyles from "./styles2";
import Alert from "@material-ui/lab/Alert";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const classes = useStyles();

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        "/api/auth/forgotpassword",
        { email },
        config
      );

      setSuccess(data.data);
      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (error) {
      setError(error.response.data.error);
      setEmail("");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper} elevation={4}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">{success}. Check your inbox!</Alert>
        )}

        <Typography
          className={classes.heading}
          align="center"
          component={"h1"}
          variant={"h5"}
        >
          Forgot Password ?
        </Typography>
        <Typography align="center" component={"h1"} variant={"h6"}>
          Please enter the email address you registered your account with. We
          will send you the password reset link.
        </Typography>
        <form className={classes.form} onSubmit={forgotPasswordHandler}>
          <Grid container spacing={3}>
            <TextField
              variant="outlined"
              label="Email Address"
              className={classes.input}
              name="Email Address"
              required
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Get Reset Link
            </Button>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordScreen;

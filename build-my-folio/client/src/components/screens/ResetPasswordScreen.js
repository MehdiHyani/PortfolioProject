import { useState } from "react";
import {
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import useStyles from "./styles2";
import Alert from "@material-ui/lab/Alert";
import "./ResetPasswordScreen.css";

const ResetPasswordScreen = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const classes = useStyles();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      setTimeout(() => {
        setError("");
      }, 5000);
      return setError("Passwords don't match");
    }

    try {
      const { data } = await axios.put(
        `/api/auth/resetpassword/${match.params.resetToken}`,
        {
          password
        },
        config
      );

      
      setSuccess(data.data);
    } catch (error) {
      setError(error.response.data.error);
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
          <Alert severity="success">{success}. Go to <a href='/login'>the Login page</a>.</Alert>
        )}

        <Typography
          className={classes.heading}
          align="center"
          component="h1"
          variant="h5"
        >
          Reset your password
        </Typography>
        <Typography align="center" component="h1" variant="h6">
          Please enter a new password.
        </Typography>
        <form className={classes.form} onSubmit={resetPasswordHandler}>
          <Grid container spacing={3}>
            <TextField
              variant="outlined"
              label="New Password"
              className={classes.input}
              name="New Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
            <TextField
              variant="outlined"
              label="Confirm New Password"
              className={classes.input}
              name="Confirm New Password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              value={confirmPassword}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={resetPasswordHandler}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ResetPasswordScreen;

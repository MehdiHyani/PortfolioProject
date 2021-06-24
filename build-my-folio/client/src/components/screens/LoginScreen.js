import React, { useState, useEffect } from "react";
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
import { Link } from 'react-router-dom';
import './LoginScreen.css';
import Alert from "@material-ui/lab/Alert";


const axios = require('axios')

const LoginScreen = ({ history }) => {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push('/');
        }
    }, [history])
  
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
        header: {
            "Content-Type": "application/json"
        }
    }

    

    try {
        const {data} = await axios.post("/api/auth/login", {email: Email, password: Password}, config);

        localStorage.setItem("authToken", data.token);

        history.push("/")
    } catch (error) {
        setError(error.response.data.error);
        setTimeout(()=> {
            setError("")
        }, 5000)
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
          <Typography component="h1" variant="h5"   >
            Sign In
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              

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

              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/register">
                  <Button>Don't have an account yet? Join us today</Button>
                </Link>
              </Grid>
            </Grid>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/forgotpassword">
                  <Button>Forgot your password ?</Button>
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </div>
  );
};

export default LoginScreen;

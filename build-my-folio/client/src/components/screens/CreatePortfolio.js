import {
  Container,
  Grid,
  Paper,
  TextField,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import "./CreatePortfolio.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LinkIcon from "@material-ui/icons/Link";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import React, { useState } from "react";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import StepConnector from "@material-ui/core/StepConnector";
import useStyle from "./styles3";
import { v4 as uuidv4 } from "uuid";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import FileBase from "react-file-base64";
import { CopyToClipboard } from "react-copy-to-clipboard";
import sanitize from "mongo-sanitize";

const axios = require("axios");

export default function CreatePortfolio() {
  const classes2 = useStyle();
  const [fullName, setFullName] = useState("");
  const [status, setStatus] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [open, setOpen] = useState(false);
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({
    LinkedIn: false,
    Github: false,
    Facebook: false,
    Twitter: false,
  });
  // eslint-disable-next-line
  const [copy, setCopy] = useState({
    value: `my.portfolio.com/${id}`,
    copied: false,
  });
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), projectName: "", projectLink: "", error: false },
  ]);
  const [error, setError] = useState("");

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        if (event.target.name === "Name of your project")
          i.projectName = event.target.value;
        else if (event.target.name === "Link of your project")
          i.projectLink = event.target.value;
      }

      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), projectName: "", projectLink: "", error: false },
    ]);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreate = async () => {
    let projects = [];

    inputFields.map((input_field) => {
      projects.push({
        projectName: input_field.projectName,
        projectLink: input_field.projectLink,
      });
      // eslint-disable-next-line array-callback-return
      return;
    });

    const new_portfolio = {
      fullName,
      status,
      bio,
      profilePic,
      linkedIn,
      github,
      facebook,
      twitter,
      projects,
    };

    console.log(new_portfolio);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (!fullName || !status || !bio || !profilePic) {
      setError("Missing Fields");
      setOpen(true);
      return;
    }

    try {
      const { data } = await axios.post(
        "/api/createportfolio/create",
        new_portfolio,
        config
      );

      setId(data.id);
      setCopy({ value: `my.portfolio.com/${id}`, copied: false });
      handleNext();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const useQontoStepIconStyles = makeStyles({
    root: {
      color: "#eaeaf0",
      display: "flex",
      height: 22,
      alignItems: "center",
    },
    active: {
      color: "#784af4",
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      backgroundColor: "currentColor",
    },
    completed: {
      color: "#784af4",
      zIndex: 1,
      fontSize: 18,
    },
  });

  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? (
          <Check className={classes.completed} />
        ) : (
          <div className={classes.circle} />
        )}
      </div>
    );
  }

  QontoStepIcon.propTypes = {
    active: PropTypes.bool,

    completed: PropTypes.bool,
  };

  const ColorlibConnector = withStyles({
    alternativeLabel: {
      top: 22,
    },
    active: {
      "& $line": {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    completed: {
      "& $line": {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    line: {
      height: 3,
      border: 0,
      backgroundColor: "#eaeaf0",
      borderRadius: 1,
    },
  })(StepConnector);

  const useColorlibStepIconStyles = makeStyles({
    root: {
      backgroundColor: "#ccc",
      zIndex: 1,
      color: "#fff",
      width: 50,
      height: 50,
      display: "flex",
      borderRadius: "50%",
      justifyContent: "center",
      alignItems: "center",
    },
    active: {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
    },
    completed: {
      backgroundImage:
        "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    },
  });
  const classes = useColorlibStepIconStyles();
  function ColorlibStepIcon(props) {
    const { active, completed } = props;

    const icons = {
      1: <AccountCircleIcon />,
      2: <PlaylistAddIcon />,
      3: <LinkIcon />,
      4: <CheckCircleIcon />,
    };

    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
          [classes.completed]: completed,
        })}
      >
        {icons[String(props.icon)]}
      </div>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  function getSteps() {
    return ["Personal setting", "Additional information", "Links", "Finished"];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <Container component="main" maxWidth="md">
            <Paper className={classes2.paper} elevation={3}>
              <Avatar className={classes2.avatar}>
                <AddCircleIcon />
              </Avatar>
              <Typography component={"span"} variant={"h5"}>
                Create a new portfolio
              </Typography>

              <form
                className={classes2.form}
                onSubmit={(e) => e.preventDefault}
              >
                <Grid container direction="column" spacing={3}>
                  <TextField
                    inputProps={{ maxLength: 40 }}
                    variant="outlined"
                    name="Full name"
                    label="Full name"
                    required
                    size="medium"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    type="text"
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      width: "75%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <TextField
                    inputProps={{ maxLength: 50 }}
                    variant="outlined"
                    name="Active Status"
                    label="Active Status"
                    required
                    placeholder="developer, designer..."
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    type="text"
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      width: "75%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                  <TextField
                    inputProps={{ maxLength: 390 }}
                    variant="outlined"
                    name="Bio"
                    label="Bio"
                    required
                    multiline
                    rows="5"
                    rowsMax="5"
                    placeholder={`Hello my name is ${fullName.toUpperCase()} and I am a ${status}...`}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    type="text"
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      width: "75%",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  />
                </Grid>
              </form>
            </Paper>
          </Container>
        );
      case 1:
        return (
          <Container component="main" style={{ width: "75%" }}>
            <Paper
              className={classes2.paper}
              elevation={4}
              style={{ marginTop: "50px" }}
            >
              <div
                style={{
                  minWidth: "80%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <h3 style={{ marginRight: "80px" }}>Profile picture :</h3>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => setProfilePic(base64)}
                  style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "50%",
                    marginLeft: "40px",
                    marginRight: "auto",
                  }}
                />
              </div>

              <TextField
                error={errors.LinkedIn}
                required
                type="url"
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Linked in URL Should be similar to https://www.linkedin.com/..... "
                  );
                }}
                pattern="^http(s)?:\/\/(www\.)?linkedin\.com\/in\/.*$"
                variant="outlined"
                name="LinkedIn Profile"
                label="LinkedIn Profile"
                placeholder="https://www.linkedin.com/....."
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: "75%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={linkedIn}
                onChange={(e) => {
                  setLinkedIn(e.target.value);
                  if (
                    e.target.value.match(
                      "^http(s)?://(www.)?linkedin.com/in/.*$"
                    )
                  ) {
                    setError("");
                    setOpen(false);
                    setErrors({ ...errors, LinkedIn: false });
                  } else {
                    setErrors({ ...errors, LinkedIn: true });
                    setError("Wrong LinkedIn URL");
                    setOpen(true);
                  }
                }}
              />
              <TextField
                error={errors.Github}
                required
                type="url"
                pattern="^http(s)?:\/\/(www\.)?github\.com\/.*$"
                placeholder="https://www.github.com/....."
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Github link Should be similar to https://www.github.com/..... "
                  );
                }}
                variant="outlined"
                name="Github Profile"
                label="Github Profile"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: "75%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={github}
                onChange={(e) => {
                  setGithub(e.target.value);
                  if (
                    e.target.value.match("^http(s)?://(www.)?github.com/.*$")
                  ) {
                    setError("");
                    setOpen(false);
                    setErrors({ ...errors, Github: false });
                  } else {
                    setErrors({ ...errors, Github: true });
                    setError("Wrong Github URL");
                    setOpen(true);
                  }
                }}
              />
              <TextField
                error={errors.Facebook}
                required
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Facebook link Should be similar to https://www.facebook.com/..... "
                  );
                }}
                type="url"
                pattern="^http(s)?:\/\/(www\.)?facebook\.com\/.*$"
                placeholder="https://www.facebook.com/....."
                variant="outlined"
                name="Facebook Profile"
                label="Facebook Profile"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: "75%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={facebook}
                onChange={(e) => {
                  setFacebook(e.target.value);
                  if (
                    e.target.value.match("^http(s)?://(www.)?facebook.com/.*$")
                  ) {
                    setError("");
                    setOpen(false);
                    setErrors({ ...errors, Facebook: false });
                  } else {
                    setErrors({ ...errors, Facebook: true });
                    setError("Wrong Fecebook URL");
                    setOpen(true);
                  }
                }}
              />
              <TextField
                onInvalid={(e) => {
                  e.target.setCustomValidity(
                    "Twitter link Should be similar to https://www.twitter.com/..... "
                  );
                }}
                required
                placeholder="https://www.twitter.com/....."
                pattern="^http(s)?://(www.)?twitter.com/.*$"
                type="url"
                variant="outlined"
                name="Twitter Handle"
                label="Twitter Handle"
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  width: "75%",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                value={twitter}
                onChange={(e) => {
                  setTwitter(e.target.value);
                  if (
                    e.target.value.match("^http(s)?://(www.)?twitter.com/.*$")
                  ) {
                    setError("");
                    setOpen(false);
                    setErrors({ ...errors, Twitter: false });
                  } else {
                    setErrors({ ...errors, Twitter: true });
                    setError("Wrong Twitter URL");
                    setOpen(true);
                  }
                }}
              />
            </Paper>
          </Container>
        );
      case 2:
        return (
          <Container component="main" style={{ width: "75%" }}>
            <Paper
              className={classes2.paper}
              elevation={4}
              style={{ marginTop: "50px" }}
            >
              <h1 title="Up to 5 projects">Add up to 5 of your projects</h1>
              <form
                className={classes2.root}
                onSubmit={(e) => e.preventDefault}
              >
                {inputFields.map((inputField, index) => (
                  <div key={inputField.id}>
                    <TextField
                      inputProps={{ maxLength: 100 }}
                      required
                      name="Name of your project"
                      label={`Project${index + 1}  name`}
                      variant="outlined"
                      value={inputField.projectName}
                      onChange={(event) =>
                        handleChangeInput(inputField.id, event)
                      }
                    />
                    <TextField
                      required
                      onInvalid={(e) => {
                        e.target.setCustomValidity(
                          "Project link Should be similar to http(s)://www....."
                        );
                      }}
                      placeholder={`Project${index + 1}  url`}
                      type="url"
                      pattern="^http(s)?://(www.)?.*$"
                      error={inputField.error}
                      name="Link of your project"
                      label="Project Link"
                      variant="outlined"
                      value={inputField.projectLink}
                      onChange={(event) => {
                        handleChangeInput(inputField.id, event);

                        if (
                          inputField.projectLink.match("^http(s)?://(www.)?.*$")
                        ) {
                          setError("");
                          setOpen(false);
                          inputField.error = false;
                        } else {
                          inputField.error = true;
                          setError("Wrong Project URL");
                          setOpen(true);
                        }
                      }}
                    />
                    {inputField.id ===
                    inputFields[inputFields.length - 1].id ? (
                      <>
                        {" "}
                        <IconButton
                          disabled={inputFields.length === 1}
                          onClick={() => handleRemoveFields(inputField.id)}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <IconButton
                          disabled={inputFields.length === 5}
                          onClick={handleAddFields}
                        >
                          <AddIcon />
                        </IconButton>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                ))}
              </form>
            </Paper>
          </Container>
        );
      case 3:
        return (
          <Container component="main" maxWidth="md">
            <Paper className={classes2.paper} elevation={3}>
              <a href={`my.portfolio.com/${id}`}>
                <h1
                  style={{ fontFamily: "serif" }}
                >{`my.portfolio.com/${id}`}</h1>
              </a>
              <br></br>
              <CopyToClipboard
                text={`my.portfolio.com/${id}`}
                onCopy={() => setCopy({ copied: true })}
              >
                <Button variant="contained" color="green">
                  Copy Link
                </Button>
              </CopyToClipboard>
            </Paper>
          </Container>
        );
      default:
        return <h1>??</h1>;
    }
  }

  return (
    <div className="wrapper">
      <div
        className="one"
        style={{ width: "75%", margin: "auto", marginTop: "30px" }}
      >
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      <div className="two">
        <Typography
          component={"span"}
          style={{ height: "100%" }}
          className={classes.instructions}
        >
          {getStepContent(activeStep)}
        </Typography>
      </div>
      <div className="three">
        {activeStep !== steps.length - 1 ? (
          <>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              style={{ color: "white" }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={
                activeStep === steps.length - 2 ? handleCreate : handleNext
              }
              className={classes.button}
            >
              {activeStep === steps.length - 2
                ? "Create your portfolio and get the link"
                : "Next"}
            </Button>
          </>
        ) : (
          <></>
        )}
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
      >
        <Alert message={error} onClose={handleClose} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

import { Container, Paper, TextField } from "@material-ui/core";
import React from "react";
import useStyles from "./styles3";

function Additional() {
  const classes2 = useStyles();
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
          <h3>Profile picture :</h3>
          <TextField
            type="file"
            multiple="false"
            required="true"
            style={{
              marginTop: "20px",
              marginBottom: "20px",
              width: "50%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            accept="image/png, image/jpeg"
          />
        </div>

        <TextField
          type="text"
          variant="outlined"
          name="LinkedIn Profile"
          label="LinkedIn Profile"
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            width: "75%",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
        <TextField
          type="text"
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
        />
        <TextField
          type="text"
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
        />
        <TextField
          type="text"
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
        />
      </Paper>
    </Container>
  );
}

export default Additional;

import { Container, Paper } from "@material-ui/core";
import React from "react";
import useStyles from "./styles3";

function FinishScreen() {
  const classes2 = useStyles();

  return (
    <Container component="main" style={{ width: "75%" }}>
      <Paper
        className={classes2.paper}
        elevation={4}
        style={{ marginTop: "50px" }}
      >
        <h1>Links</h1>
      </Paper>
    </Container>
  );
}

export default FinishScreen;

import React from "react";
import { Container, Grid } from "@material-ui/core";
import NavBar from "./NavBar";
import CreatePortfolio from "./CreatePortfolio";
import Bottom from "./Bottom";
import "./Home.css";

function Home(history) {
  return (
    <Container component="main" maxWidth="lg">
      <Grid container spacing={2} direction="column" justify="space-evenly">
        <NavBar />
        <CreatePortfolio />
        <div className="footer">
          <Bottom />
        </div>
      </Grid>
    </Container>
  );
}

export default Home;

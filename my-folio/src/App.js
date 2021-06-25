import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Home";
import Error from "./Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Error} />
          <Route path="/view/:id" component={Home} />
          <Route
            exact
            path="/about"
            render={() => {
              window.location.href = "About.html";
            }}
          />
          <Route exact path="*" component={Error} />
          <Route exact path="/error" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

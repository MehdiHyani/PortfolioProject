import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./Home";
import About from "./About";
import Redirect from "./Redirect";
import Error from "./Error";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Redirect} />
          <Route path="/view/:id" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="*" component={Error} />
          <Route exact path="/error" component={Error} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

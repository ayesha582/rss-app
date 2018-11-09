import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from './Main';

const AppRouter = () => (
  <Router>
      <Route path="/" exact component={Main} />
  </Router>
);

export default AppRouter;
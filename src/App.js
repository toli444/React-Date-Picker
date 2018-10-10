import React from 'react';
import MainPage from './main-page';
import ExamplePage from './example-page';
import { HashRouter as Router, Route, NavLink } from "react-router-dom";
import styles from './App.less';

const AppRouter = () => (
  <Router>
    <div className={styles.app}>
      <nav className={styles.navbar}>
        <NavLink to="/" activeClassName="active" exact>Home</NavLink>
        <NavLink to="/example" activeClassName="active" exact>Real Example</NavLink>
      </nav>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/example" component={ExamplePage} />
      <Route exact path="/example/:id" component={ExamplePage} />
    </div>
  </Router>
);

export default AppRouter;

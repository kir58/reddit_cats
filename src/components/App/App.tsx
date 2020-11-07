import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.css';
import Favourites from '../Favourites/Favourites';
import Index from '../Index/Index';
import Header from '../Header/Header';

const App = () => (
  <div className={styles.container}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/favourites" component={Favourites} />
      </Switch>
    </Router>
  </div>
);
export default App;

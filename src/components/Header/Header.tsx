import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.css';

export default () => (
  <ul className={styles.list}>
    <NavLink exact to="/" className={styles.link} activeClassName={styles.active}>
      <li className={styles.item}>Cats</li>
    </NavLink>
    <NavLink exact to="/favourites" className={styles.link} activeClassName={styles.active}>
      <li className={styles.item}>Favourites</li>
    </NavLink>
  </ul>
);

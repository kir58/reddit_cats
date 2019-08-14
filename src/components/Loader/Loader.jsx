import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './Loader.css';

const Loader = ({ byCenter }) => {
  const loaderPosition = cn({
    [styles.loader_by_center]: byCenter,
    [styles.loader_after_element]: !byCenter,
  });
  return (
    <div className={loaderPosition}>
      <div className={styles.loader} />
    </div>
  );
};

Loader.propTypes = {
  byCenter: PropTypes.bool.isRequired,
};
export default Loader;

import React from 'react';
import cn from 'classnames';
import styles from './Loader.css';

type Props = {
  byCenter: boolean,
}
const Loader = ({ byCenter }: Props) => {
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

export default Loader;

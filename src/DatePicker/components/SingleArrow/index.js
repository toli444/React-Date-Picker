import React from 'react';
import styles from './styles.less';

export default function SingleArrow(props) {
  return <div className={styles['double-arrow']}>{props.left ? '<' : '>'}</div>;
};


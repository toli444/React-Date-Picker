import React from 'react';
import styles from './styles.css';

export default function SingleArrow(props) {
  return <div className={styles['double-arrow']}>{props.left ? '<' : '>'}</div>;
};


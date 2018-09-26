import React from 'react';
import styles from './styles.css';

export default function DoubleArrow(props) {
  return <div className={styles['double-arrow']}>{props.left ? '<<' : '>>'}</div>;
};

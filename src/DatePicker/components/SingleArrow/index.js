import React from 'react';
import styles from './styles.less';

export default function SingleArrow({left, onClick}) {
  return <div onClick={onClick} className={styles['double-arrow']}>{left ? '<' : '>'}</div>;
};


import React from 'react';
import styles from './styles.less';
import PropTypes from "prop-types";

const DoubleArrow = ({left, onClick}) => {
  return <div onClick={onClick} className={styles['double-arrow']}>{left ? '<<' : '>>'}</div>;
};

DoubleArrow.propTypes = {
  left: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DoubleArrow;

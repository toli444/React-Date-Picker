import React from 'react';
import styles from './styles.less';
import PropTypes from 'prop-types';

const SingleArrow = ({left, onClick}) => {
  return <div onClick={onClick} className={styles['single-arrow']}>{left ? '<' : '>'}</div>;
};

SingleArrow.propTypes = {
  left: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SingleArrow;




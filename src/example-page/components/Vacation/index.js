import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.less';

const Vacation = ({name, startDate, endDate, format}) => (
  <li>
    <b>{name}</b> is on vacation from <b>{startDate.format(format)}</b> to <b>{endDate.format(format)}</b>
  </li>);

Vacation.propTypes = {
  name: PropTypes.string.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
};

export default Vacation;

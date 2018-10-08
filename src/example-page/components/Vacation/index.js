import React from 'react';
import PropTypes from 'prop-types';

const Vacation = ({name, startDate, endDate, format}) => (
  <li>
    <b>{name}</b> is on vacation from <b>{startDate.format(format)}</b> to <b>{endDate.format(format)}</b>
  </li>);

Vacation.propTypes = {
  name: PropTypes.string.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  format: PropTypes.string.isRequired,
};

export default Vacation;

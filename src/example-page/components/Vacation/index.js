import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import styles from './styles.less';

const Vacation = ({id, name, startDate, endDate, format}) => (
  <li className={styles.validation}>
    <div className={styles['validation-container']}>
    <span>
      <b>{name}</b> is on vacation from <b>{startDate.format(format)}</b> to <b>{endDate.format(format)}</b>
    </span>
      <div className={styles.controls}>
        <Link to={`/example/vacation/${id}`}>
          <button>Edit</button>
        </Link>
      </div>
    </div>
  </li>
);

Vacation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  startDate: PropTypes.object.isRequired,
  endDate: PropTypes.object.isRequired,
  format: PropTypes.string.isRequired,
};

export default Vacation;

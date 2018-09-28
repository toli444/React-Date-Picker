import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';

import styles from './styles.less';

const EditingDateInput = ({currentDate, editingUnit, format}) => {
  const month = moment(currentDate, format).format('MMM');
  const year = moment(currentDate, format).format('YYYY');

  return <div className={styles['editing-date-input']}>
    <span className={`${editingUnit === 'month' ? styles.selected : ''} month`}>{month}</span>
    <span className={`${editingUnit === 'year' ? styles.selected : ''} year`}>{year}</span>
  </div>;
};

EditingDateInput.propTypes = {
  currentDate: PropTypes.object,
  editingUnit: PropTypes.string,
  format: PropTypes.string,
};

export default EditingDateInput;

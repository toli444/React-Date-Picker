import React from 'react';
import moment from 'moment'
import styles from './styles.less';

export default function EditingDateInput({currentDate, editingUnit, format}) {
  const month = moment(currentDate, format).format('MMM');
  const year = moment(currentDate, format).format('YYYY');

  return <div className={styles['editing-date-input']}>
    <span className={editingUnit === 'month' ? styles.selected : ''}>{month}</span>
    <span className={editingUnit === 'year' ? styles.selected : ''}>{year}</span>
  </div>;
};

import React from 'react'
import PropTypes from 'prop-types';
import IntervalPicker from '../../../components/IntervalPicker/index';
import withFormLogic from './withFormLogic';

import styles from './styles.less';

const VacationForm = ({
  name,
  handleNameChange,
  startDate,
  handleStartDateChange,
  endDate,
  handleEndDateChange,
  handleSubmit,
  format,
  isFormValid,
}) => (
  <div className={styles.form}>
    <form
      onSubmit={handleSubmit}
    >
      <div className={styles['form-element']}>
        <label htmlFor="name">Name: </label>
        <input
          className={styles.field} id="name"
          value={name}
          onChange={e => handleNameChange(e.target.value)}
        />
      </div>
      <div className={styles['form-element']}>
        <IntervalPicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={handleStartDateChange}
          onEndDateChange={handleEndDateChange}
          format={format}
        />
      </div>
      <button type="submit" className={styles.submit} disabled={isFormValid()}>
        Save vacation
      </button>
    </form>
  </div>
);

VacationForm.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  handleNameChange: PropTypes.func,
  startDate: PropTypes.object,
  handleStartDateChange: PropTypes.func,
  endDate: PropTypes.object,
  handleEndDateChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  format: PropTypes.string,
  isFormValid: PropTypes.func,
};

export default withFormLogic(VacationForm)

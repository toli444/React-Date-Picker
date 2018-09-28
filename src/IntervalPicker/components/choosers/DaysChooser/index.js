import PropTypes from 'prop-types';
import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';

import styles from './styles.less';

class DaysChooser extends Component {
  static propTypes = {
    currentDate: PropTypes.object,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onDateChange: PropTypes.func,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    format: PropTypes.string,
  };

  getDaysToShow(currentDate) {
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('month');
    const startOfWeekMonth = moment(startOfMonth).startOf('week');
    const endOfWeekMonth = moment(endOfMonth).endOf('week');

    const daysToShow = [];
    const currentDay = moment(startOfWeekMonth);

    while (currentDay <= endOfWeekMonth) {
      daysToShow.push(moment(currentDay));
      currentDay.add(1, 'day');
    }

    return daysToShow;
  }

  getCombinedDaysByWeeks(days, currentDate) {
    const normalizedDays = (days || []).map(day => {
      const dayValue = moment(day);

      return {
        value: dayValue,
        formattedValue: dayValue.format('D'),
        isCurrentMonth: currentDate.isSame(dayValue, 'month')
      }
    });

    return _.chunk(normalizedDays, 7);
  }

  getAnotherMonthClass(day) {
    return !day.isCurrentMonth && styles['another-month'];
  }

  getCurrentDayClass(day) {
    return this.props.currentDate.isSame(day.value, 'day') && styles.current;
  }

  getBetweenDaysClass(day) {
    const {startDate, endDate} = this.props;

    return (day.value.isSameOrBefore(endDate) && day.value.isSameOrAfter(startDate)) && styles.selected;
  }

  getBorderDaysClass(day) {
    const {startDate, endDate} = this.props;

    if (day.value.isSame(startDate)) {
      if (day.value.isSame(endDate)) {
        return `${styles['left-border']} ${styles['right-border']}`;
      }

      return styles['left-border'];
    }

    if (day.value.isSame(endDate)) {
      return styles['right-border'];
    }
  }

  getDisabledDayClass(day) {
    const {minDate, maxDate} = this.props;

    return (day.value.isBefore(minDate) || day.value.isAfter(maxDate)) && styles.disabled;
  }

  getDayClasses(day) {
    return [
      styles.day,
      this.getAnotherMonthClass(day),
      this.getCurrentDayClass(day),
      this.getDisabledDayClass(day),
      this.getBetweenDaysClass(day),
      this.getBorderDaysClass(day),
    ].filter(Boolean).join(' ');
  }

  render() {
    const {currentDate, onDateChange, format} = this.props;
    const daysToShow = this.getDaysToShow(moment(currentDate, format));
    const combinedDaysByWeeks = this.getCombinedDaysByWeeks(daysToShow, currentDate);

    return (
      <div className={styles['days-chooser']}>
        {(combinedDaysByWeeks || []).map((week, index) => {
          return (
            <div className={styles.week} key={index}>
              {week.map(day => {
                return (
                  <span
                    className={this.getDayClasses(day)}
                    key={day.formattedValue}
                    onClick={() => onDateChange(day.value)}
                  >
                  {day.formattedValue}
                  </span>
                )
              })}
            </div>)
        })}
      </div>
    );
  }
}

DaysChooser.propTypes = {};

export default DaysChooser;

import PropTypes from 'prop-types';
import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';

import styles from './styles.less';

class DaysChooser extends Component {
  static propTypes = {
    currentDate: PropTypes.object.isRequired,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onDateChange: PropTypes.func,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    format: PropTypes.string,
  };

  getDaysToShow(currentDate) {
    const daysToShow = [];
    const endOfWeekMonth = this.getEndOfWeekMonth(currentDate);
    const currentDay = this.getStartOfWeekMonth(currentDate);

    while (currentDay <= endOfWeekMonth) {
      daysToShow.push(moment(currentDay));
      currentDay.add(1, 'day');
    }

    return daysToShow;
  }

  getStartOfWeekMonth(currentDate) {
    const startOfMonth = moment(currentDate).startOf('month');

    return moment(startOfMonth).startOf('week');
  }

  getEndOfWeekMonth(currentDate) {
    const endOfMonth = moment(currentDate).endOf('month');

    return moment(endOfMonth).endOf('week');
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
    return day.isCurrentMonth ? '' : styles['another-month'];
  }

  getCurrentDayClass(day) {
    return day.value && this.props.currentDate.isSame(day.value, 'day') ? styles.current : '';
  }

  getBetweenDaysClass(day) {
    const {startDate, endDate} = this.props;

    return (
      day.value &&
      day.value.isSameOrBefore(endDate, 'day') &&
      day.value.isSameOrAfter(startDate, 'day')
    ) ? styles.selected : '';
  }

  getBorderDaysClass(day) {
    const {startDate, endDate} = this.props;

    if (!day.value) {
      return ''
    }

    if (day.value.isSame(startDate, 'day')) {
      if (day.value.isSame(endDate, 'day')) {
        return `${styles['left-border']} ${styles['right-border']}`;
      }

      return styles['left-border'];
    }

    if (day.value.isSame(endDate, 'day')) {
      return styles['right-border'];
    }

    return '';
  }

  getDisabledDayClass(day) {
    return this.isDayDisabled(day.value) ? styles.disabled : '';
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

  isDayDisabled(dayValue) {
    const {minDate, maxDate} = this.props;

    return dayValue.isBefore(minDate) || dayValue.isAfter(maxDate);
  }

  handleDayClick = dayValue => {
    if (!this.isDayDisabled(dayValue)) {
      this.props.onDateChange(dayValue);
    }
  };

  render() {
    const {currentDate, format} = this.props;
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
                    onClick={() => this.handleDayClick(day.value)}
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

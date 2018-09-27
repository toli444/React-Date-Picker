import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';

import styles from './styles.less';

class DaysChooser extends Component {
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
    return day.isCurrentMonth ? '' : styles['another-month']
  }

  getCurrentDayClass(day, currentDate) {
    return currentDate.isSame(day.value, 'day') ? styles.selected : ''
  }

  getDayClasses(day, currentDate) {
    return [
      styles.day,
      this.getAnotherMonthClass(day),
      this.getCurrentDayClass(day, currentDate)
    ].filter(Boolean).join(' ');
  }

  render() {
    const {currentDate, onDateChange, minDate, maxDate, format} = this.props;
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
                    className={this.getDayClasses(day, currentDate)}
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

export default DaysChooser;

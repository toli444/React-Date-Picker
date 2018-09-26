import React, {Component} from 'react';
import moment from 'moment';
import styles from './styles.less';

import SingleArrow from './components/SingleArrow';
import DoubleArrow from './components/DoubleArrow';

class DatePicker extends Component {
  static defaultProps = {
    date: '11-11-2011',
    format: 'DD-MM-YYYY',
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: props.date ? moment(props.date).format(props.format) : '',
      isCalendarShown: false,
    };
  }

  subDate = () => {
  };

  toggleCalendarShown = (isCalendarShown) => {
    this.setState({isCalendarShown});
  };

  render() {
    const {selectedDate, isCalendarShown} = this.state;

    return (
      <div className={styles['date-picker']}>
        <div>
          <input
            type="text"
            className="selected-date"
            value={selectedDate}
            onFocus={() => this.toggleCalendarShown(true)}
            onBlur={() => this.toggleCalendarShown(false)}
          />
        </div>
        {isCalendarShown && <div>
          <div className={styles['calendar-heading']}>
            <DoubleArrow
              left
              onClick={() => this.subDate(1, 'year')}
            />
            <SingleArrow
              left
              onClick={() => this.subDate(1, 'month')}
            />
            <input className="pick-month-year" value="ttt"/>
            <SingleArrow onClick={() => this.addDate(1, 'month')}/>
            <DoubleArrow onClick={() => this.addDate(1, 'year')}/>
          </div>
          {/*<CalendarBody*/}
          {/*date={dateToEdit}*/}
          {/*format={format}*/}
          {/*maxDate={maxDate}*/}
          {/*minDate={minDate}*/}
          {/*onChange={(value, unit) => this.handleDateChange(value, unit)}*/}
          {/*viewFor={setViewFor}*/}
          {/*yearBlock={yearBlock}*/}
          {/*/>*/}
        </div>
        }
      </div>
    );
  }
}

export default DatePicker;

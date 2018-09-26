 import React, {Component} from 'react';
import moment from 'moment';
import styles from './styles.less';

import SingleArrow from './components/SingleArrow';
import DoubleArrow from './components/DoubleArrow';

class DatePicker extends Component {
  static defaultProps = {
    date: '11-11-2011',
    maxDate: '11-11-2014',
    minDate: '11-11-2008',
    format: 'DD-MM-YYYY',
  };

  blurTimeout = null;

  constructor(props) {
    super(props);

    this.state = {
      currentDate: props.date ? moment(props.date, props.format) : '',
      isCalendarShown: false,
    };
  }

  isNewDateValid(newDate) {
    const {maxDate, minDate, format} = this.props;

    return newDate.isBetween(moment(minDate, format), moment(maxDate, format));
  }


  addDate(amount, unit) {
    const { format } = this.props;
    const { currentDate } = this.state;
    const newDate = moment(currentDate, format).add(amount, unit);

    if (this.isNewDateValid(newDate)) {
      this.setState({currentDate: newDate})
    }
  }


  subDate(amount, unit) {
    const { format } = this.props;
    const { currentDate } = this.state;
    const newDate = moment(currentDate, format).subtract(amount, unit);

    if (this.isNewDateValid(newDate)) {
      this.setState({currentDate: newDate})
    }
  }

  onBlurHandler = () => {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isCalendarShown: false
      });
    });
  };

  onFocusHandler = () => {
    clearTimeout(this.blurTimeout);
    this.setState({
      isCalendarShown: true
    });
  };

  render() {
    const { format } = this.props;
    const {currentDate, isCalendarShown} = this.state;

    return (
      <div
        className={styles['date-picker']}
        onFocus={this.onFocusHandler}
        onBlur={this.onBlurHandler}
        tabIndex="0"
      >
        <input
          type="text"
          className="selected-date"
          value={currentDate.format(format)}
        />
        {isCalendarShown && <div className={styles.calendar}>
          <div className={styles.heading}>
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

import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles.less';

import SingleArrow from './components/SingleArrow';
import DoubleArrow from './components/DoubleArrow';
import EditingDateInput from './components/EditingDateInput';
import DaysChooser from './components/choosers/DaysChooser';

class DatePicker extends Component {
  static propTypes = {
    currentDate: PropTypes.string,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    format: PropTypes.string,
  };

  static defaultProps = {
    currentDate: '11-11-2011',
    maxDate: '11-11-2014',
    minDate: '11-11-2008',
    format: 'DD-MM-YYYY',
  };

  blurTimeout = null;

  constructor(props) {
    super(props);

    this.state = {
      currentDate: props.currentDate ? moment(props.currentDate, props.format) : '',
      isCalendarShown: false,
      editingUnit: null,
    };
  }

  isNewDateValid(newDate) {
    const {maxDate, minDate, format} = this.props;

    return newDate.isBetween(moment(minDate, format), moment(maxDate, format));
  }


  addDate(amount, unit) {
    const {format} = this.props;
    const {currentDate} = this.state;
    const newDate = moment(currentDate, format).add(amount, unit);

    if (this.isNewDateValid(newDate)) {
      this.setState({currentDate: newDate, editingUnit: unit})
    }
  }


  subDate(amount, unit) {
    const {format} = this.props;
    const {currentDate} = this.state;
    const newDate = moment(currentDate, format).subtract(amount, unit);

    if (this.isNewDateValid(newDate)) {
      this.setState({currentDate: newDate, editingUnit: unit})
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

  handleDateChange = newDate => {
    this.setState({currentDate: newDate});
  };

  render() {
    const {format} = this.props;
    const {currentDate, isCalendarShown, editingUnit} = this.state;

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
          readOnly
        />
        {isCalendarShown && <div className={styles.calendar}>
          <div className={styles.heading}>
            <DoubleArrow left onClick={() => this.subDate(1, 'year')}/>
            <SingleArrow left onClick={() => this.subDate(1, 'month')}/>
            <EditingDateInput currentDate={currentDate} editingUnit={editingUnit} format={format} />
            <SingleArrow onClick={() => this.addDate(1, 'month')}/>
            <DoubleArrow onClick={() => this.addDate(1, 'year')}/>
          </div>
          {<DaysChooser currentDate={currentDate} onDateChange={this.handleDateChange}/>}
        </div>
        }
      </div>
    );
  }
}

export default DatePicker;

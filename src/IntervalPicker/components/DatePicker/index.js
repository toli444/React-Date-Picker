import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles.less';

import SingleArrow from '../SingleArrow';
import DoubleArrow from '../DoubleArrow';
import EditingDateInput from '../EditingDateInput';
import DaysChooser from '../choosers/DaysChooser';

class DatePicker extends Component {
  static propTypes = {
    value: PropTypes.object,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    format: PropTypes.string,
    onDateChange: PropTypes.func,
    label: PropTypes.string,
  };

  blurTimeout = null;

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.state = {
      currentDate: this.getCurrentDate(),
      isFocusIn: false,
      editingUnit: null,
    };
  }

  getCurrentDate() {
    const {value, startDate, format} = this.props;
    const actualValue = value || startDate;

    return actualValue ? moment(actualValue, format) : null
  }

  addDate(amount, unit) {
    const {format} = this.props;
    const {currentDate} = this.state;
    const newDate = moment(currentDate, format).add(amount, unit);

    this.setState({currentDate: newDate, editingUnit: unit})
  }

  subDate(amount, unit) {
    const {format} = this.props;
    const {currentDate} = this.state;
    const newDate = moment(currentDate, format).subtract(amount, unit);

    this.setState({currentDate: newDate, editingUnit: unit})
  }

  focusIn() {
    this.containerRef.current.focus();
  }

  onBlurHandler = () => {
    this.blurTimeout = setTimeout(() => {
      this.setState({
        isFocusIn: false
      });
    });
  };

  onFocusHandler = () => {
    clearTimeout(this.blurTimeout);

    if (!this.state.isFocusIn) {
      this.setState({
        isFocusIn: true,
        currentDate: this.getCurrentDate(),
      });
    }
  };

  handleDateChange = newDate => {
    this.setState({currentDate: newDate, isFocusIn: false});
    this.props.onDateChange(newDate);
  };

  render() {
    const {format, value, startDate, endDate, minDate, maxDate, label} = this.props;
    const {currentDate, isFocusIn, editingUnit} = this.state;

    return (
      <div
        className={styles['date-picker']}
        onFocus={this.onFocusHandler}
        onBlur={this.onBlurHandler}
        tabIndex="0"
        ref={this.containerRef}
      >
        <div className={styles['selected-date-container']}>
          <label>{label}</label>
          <input
            type="text"
            className={styles['selected-date']}
            value={value ? value.format(format) : ''}
            readOnly
          />
        </div>
        {isFocusIn && <div className={styles.calendar}>
          <div className={styles.heading}>
            <DoubleArrow left onClick={() => this.subDate(1, 'year')}/>
            <SingleArrow left onClick={() => this.subDate(1, 'month')}/>
            <EditingDateInput currentDate={currentDate} editingUnit={editingUnit} format={format}/>
            <SingleArrow onClick={() => this.addDate(1, 'month')}/>
            <DoubleArrow onClick={() => this.addDate(1, 'year')}/>
          </div>
          {<DaysChooser
            currentDate={currentDate}
            startDate={startDate}
            endDate={endDate}
            onDateChange={this.handleDateChange}
            minDate={minDate}
            maxDate={maxDate}
          />}
        </div>
        }
      </div>
    );
  }
}

export default DatePicker;
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
    date: PropTypes.object,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    format: PropTypes.string,
    onDateChange: PropTypes.func,
  };

  static defaultProps = {
    date: '11-11-2011',
    maxDate: '11-11-2014',
    minDate: '11-11-2008',
    format: 'DD-MM-YYYY',
  };

  blurTimeout = null;

  constructor(props) {
    super(props);

    this.containerRef = React.createRef();
    this.state = {
      currentDate: props.date ? moment(props.date, props.format) : '',
      isFocusIn: false,
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

  focusMe() {
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
    this.setState({
      isFocusIn: true
    });
  };

  handleDateChange = newDate => {
    this.setState({currentDate: newDate, isFocusIn: false});
    this.props.onDateChange(newDate);
  };

  render() {
    const {format, date} = this.props;
    const {currentDate, isFocusIn, editingUnit} = this.state;

    return (
      <div
        className={styles['date-picker']}
        onFocus={this.onFocusHandler}
        onBlur={this.onBlurHandler}
        tabIndex="0"
        ref={this.containerRef}
      >
        <input
          type="text"
          className="selected-date"
          value={date.format(format)}
          readOnly
        />
        {isFocusIn && <div className={styles.calendar}>
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

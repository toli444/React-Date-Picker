import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles.less';

import DatePicker from './components/DatePicker/index';

class IntervalPicker extends Component {
  static propTypes = {
    startDate: PropTypes.object,
    endDate: PropTypes.object,
    onStartDateChange: PropTypes.func,
    onEndDateChange: PropTypes.func,
    minDate: PropTypes.object,
    maxDate: PropTypes.object,
    format: PropTypes.string,
  };

  static defaultProps = {
    startDate: moment(),
    endDate: moment(),
    maxDate: moment().add(3, 'years'),
    minDate: moment().subtract(3, 'years'),
    format: 'DD-MM-YYYY',
    onStartDateChange: () => {},
    onEndDateChange: () => {},
  };

  constructor(props) {
    super(props);

    this.endDatePickerRef = React.createRef();
  }

  handleStartDateChange = value => {
    const {endDate, onStartDateChange, onEndDateChange} = this.props;
    onStartDateChange(value);

    if (value.isSameOrAfter(endDate)) {
      onEndDateChange(value);
    }

    setImmediate(() => {
      this.endDatePickerRef.current.focusIn();
    });
  };

  render() {
    const {minDate, maxDate, format, onEndDateChange, startDate, endDate} = this.props;

    return (
      <div className={styles['interval-picker']}>
        <DatePicker
          value={startDate}
          startDate={startDate}
          endDate={endDate}
          onDateChange={value => this.handleStartDateChange(value)}
          minDate={minDate}
          maxDate={maxDate}
          format={format}
          label={'Date from:'}
        />
        <DatePicker
          className="right"
          value={endDate}
          startDate={startDate}
          endDate={endDate}
          onDateChange={onEndDateChange}
          minDate={startDate}
          maxDate={maxDate}
          format={format}
          ref={this.endDatePickerRef}
          label={'Date to:'}
        />
      </div>
    );
  }
}

export default IntervalPicker;

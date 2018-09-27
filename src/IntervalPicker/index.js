import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles.less';

import DatePicker from './components/DatePicker';

class IntervalPicker extends Component {
  static propTypes = {
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onStartDateChange: PropTypes.func,
    onEndDateChange: PropTypes.func,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    format: PropTypes.string,
  };

  static defaultProps = {
    startDate: '11-11-2011',
    endDate: '15-11-2011',
    maxDate: '11-11-2014',
    minDate: '11-11-2008',
    format: 'DD-MM-YYYY',
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate ? moment(props.startDate, props.format) : '',
      endDate: props.endDate ? moment(props.endDate, props.format) : '',
    };

    this.endDatePickerRef = React.createRef();
  }

  onStartDateChange = value => {
    this.setState({startDate: value});
    this.endDatePickerRef.current.focusMe();
  };

  onEndDateChange = value => {
    this.setState({endDate: value})
  };

  render() {
    const {startDate, endDate} = this.state;

    return (
      <div className={styles['interval-picker']}>
        <DatePicker
          date={startDate}
          onDateChange={value => this.onStartDateChange(value)}
        />
        <DatePicker
          date={endDate}
          onDateChange={value => this.onEndDateChange(value)}
          ref={this.endDatePickerRef}
        />
      </div>
    );
  }
}

export default IntervalPicker;

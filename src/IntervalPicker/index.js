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
      startDate: props.startDate ? moment(props.startDate, props.format) : null,
      endDate: props.endDate ? moment(props.endDate, props.format) : null,
    };

    this.endDatePickerRef = React.createRef();
  }

  onStartDateChange = value => {
    this.setState({startDate: value});

    if (value.isSameOrAfter(this.state.endDate)) {
      this.setState({endDate: null}, () => {
        this.endDatePickerRef.current.focusIn();
      });
    } else {
      this.endDatePickerRef.current.focusIn();
    }
  };

  onEndDateChange = value => {
    this.setState({endDate: value});
  };

  render() {
    const {minDate, maxDate, format} = this.props;
    const {startDate, endDate} = this.state;

    return (
      <div className={styles['interval-picker']}>
        <DatePicker
          value={startDate}
          startDate={startDate}
          endDate={endDate}
          onDateChange={value => this.onStartDateChange(value)}
          minDate={moment(minDate, format)}
          maxDate={moment(maxDate, format)}
          format={format}
          label={'Date from:'}
        />
        <DatePicker
          value={endDate}
          startDate={startDate}
          endDate={endDate}
          onDateChange={value => this.onEndDateChange(value)}
          minDate={moment(startDate)}
          maxDate={moment(maxDate, format)}
          format={format}
          ref={this.endDatePickerRef}
          label={'Date to:'}
        />
      </div>
    );
  }
}

export default IntervalPicker;

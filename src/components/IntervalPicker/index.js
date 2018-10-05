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
    maxDate: moment().add(3, 'years'),
    minDate: moment().subtract(3, 'years'),
    format: 'DD-MM-YYYY',
    onStartDateChange: () => {},
    onEndDateChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate || moment(),
      endDate: props.endDate || moment(),
    };

    this.endDatePickerRef = React.createRef();
  }

  handleStartDateChange = value => {
    this.setState({startDate: value});
    this.props.onStartDateChange(value);

    if (value.isSameOrAfter(this.state.endDate)) {
      this.setState({endDate: null}, () => {
        this.endDatePickerRef.current.focusIn();
      });
    } else {
      this.endDatePickerRef.current.focusIn();
    }
  };

  handleEndDateChange = value => {
    this.setState({endDate: value});
    this.props.onEndDateChange(value);
  };

  render() {
    const {minDate, maxDate, format} = this.props;

    return (
      <div className={styles['interval-picker']}>
        <DatePicker
          value={this.props.startDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDateChange={value => this.handleStartDateChange(value)}
          minDate={minDate}
          maxDate={maxDate}
          format={format}
          label={'Date from:'}
        />
        <DatePicker
          className="right"
          value={this.props.endDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onDateChange={value => this.handleEndDateChange(value)}
          minDate={this.state.startDate}
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

import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import styles from './styles.less';

import DatePicker from './components/DatePicker';

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
    endDate: moment().add(3, 'month'),
    maxDate: moment().add(3, 'years'),
    minDate: moment().subtract(3, 'years'),
    format: 'DD-MM-YYYY',
    onStartDateChange: () => {},
    onEndDateChange: () => {},
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: props.startDate ? moment(props.startDate, props.format) : null,
      endDate: props.endDate ? moment(props.endDate, props.format) : null,
    };

    this.endDatePickerRef = React.createRef();
  }

  componentDidMount() {
    this.props.onStartDateChange(this.props.startDate);
    this.props.onEndDateChange(this.props.endDate);
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
    const {startDate, endDate} = this.state;

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
          onDateChange={value => this.handleEndDateChange(value)}
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

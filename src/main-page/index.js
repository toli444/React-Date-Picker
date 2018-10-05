import React, {Component} from 'react';
import IntervalPicker from '../components/IntervalPicker';

import styles from './styles.less';
import moment from "moment";

class MainPage extends Component {
  format = 'DD/MM/YYYY';

  state = {
    startDate: moment(),
    endDate: moment().add(3, 'month'),
  };

  handleStartDateChange = value => {
    this.setState({startDate: value});
  };

  handleEndDateChange = value => {
    this.setState({endDate: value});
  };

  render() {
    const {startDate, endDate} = this.state;

    return (
      <div className={styles['main-page']}>
        <div className={styles.header}>
          <div>
            <label>Start date: </label>
            <span>{this.state.startDate.format(this.format)}</span>
          </div>
          <div>
            <label>End date: </label>
            <span>{this.state.endDate.format(this.format)}</span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles['date-picker-wrapper']}>
            <IntervalPicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={this.handleStartDateChange}
              onEndDateChange={this.handleEndDateChange}
              format={this.format}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;

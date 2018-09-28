import React, {Component} from 'react';
import IntervalPicker from './IntervalPicker/index';

import styles from './App.less';

class App extends Component {
  state = {
    startDate: '',
    endDate: ''
  };

  format = 'DD/MM/YYYY';

  handleStartDateChange = value => {
    debugger;

    this.setState({startDate: value.format(this.format)});
  };

  handleEndDateChange = value => {
    this.setState({endDate: value.format(this.format)});
  };

  render() {
    return (
      <div className={styles['main-page']}>
        <div className={styles.header}>
          <div>
            <label>Start date: </label>
            <span>{this.state.startDate}</span>
          </div>
          <div>
            <label>End date: </label>
            <span>{this.state.endDate}</span>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles['date-picker-wrapper']}>
            <IntervalPicker
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

export default App;

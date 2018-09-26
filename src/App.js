import React, {Component} from 'react';
import DatePicker from './DatePicker/index';

import styles from './App.less';

class App extends Component {
  render() {
    return (
      <div className={styles['main-page']}>
          <div className={styles['date-picker-wrapper']}>
            <DatePicker />
          </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import IntervalPicker from './IntervalPicker/index';

import styles from './App.less';

class App extends Component {
  render() {
    return (
      <div className={styles['main-page']}>
          <div className={styles['date-picker-wrapper']}>
            <IntervalPicker />
          </div>
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import DatePicker from './DatePicker/index';

import styles from './App.less';

class App extends Component {
  render() {
    return (
      <div className={styles['main-page']}>
        <DatePicker />
      </div>
    );
  }
}

export default App;

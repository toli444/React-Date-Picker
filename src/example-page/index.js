import React, {Component} from 'react';
import VacationForm from './containers/VacationForm';
import VacationsList from "./containers/VacationsList";

import styles from './styles.less';

class ExamplePage extends Component {
  format = 'DD/MM/YYYY';

  render() {
    return (
      <div className={styles['example-page']}>
        <VacationsList format={this.format} />
        <VacationForm format={this.format} />
      </div>
    );
  }
}

export default ExamplePage;

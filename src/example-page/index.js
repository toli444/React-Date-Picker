import React, {Component} from 'react';
import VacationForm from './containers/VacationForm';
import VacationsList from './containers/VacationsList';
import VacationFilters from './containers/VacationFilters';

import styles from './styles.less';

class ExamplePage extends Component {
  format = 'DD/MM/YYYY';

  render() {
    return (
      <div className={styles['example-page']}>
        <VacationsList format={this.format} />
        <div>
          <VacationForm format={this.format} />
          <VacationFilters />
        </div>
      </div>
    );
  }
}

export default ExamplePage;

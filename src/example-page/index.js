import React from 'react';
import PropTypes from 'prop-types';
import VacationForm from './containers/VacationForm';
import VacationsList from './containers/VacationsList';
import VacationFilters from './containers/VacationFilters';

import styles from './styles.less';

const ExamplePage = ({ match }) => {
  const format = 'DD/MM/YYYY';
  const vacationId = parseInt(match.params.id, 10) || null;

  return (
    <div className={styles['example-page']}>
      <VacationsList format={format} />
      <div className={styles['right-pane']}>
        <VacationForm format={format} id={vacationId} key={vacationId}/>
        <VacationFilters />
      </div>
    </div>
  );
};

ExamplePage.propTypes = {
  match: PropTypes.object,
};

export default ExamplePage;

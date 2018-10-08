import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment';
import {VisibilityFilters} from '../../actions';
import Vacation from '../../components/Vacation';

const today = moment();

const isPastVacation = vacation => today.isAfter(vacation.endDate, 'day');
const isCurrentVacation = vacation => (
  today.isSameOrAfter(vacation.startDate, 'day') &&
  today.isSameOrBefore(vacation.endDate, 'day')
);
const isFutureVacation = vacation => today.isBefore(vacation.startDate, 'day');

const filters = {
  [VisibilityFilters.PAST]: isPastVacation,
  [VisibilityFilters.CURRENT]: isCurrentVacation,
  [VisibilityFilters.FUTURE]: isFutureVacation,
};

const isVisibleVacation = (vacation, currentFilters) => {
  for (let filter of currentFilters) {
    if (filters[filter](vacation)) {
      return true;
    }
  }

  return false;
};

const getVisibleVacations = (vacations, currentFilters) => {
  if (currentFilters.length === VisibilityFilters.length) {
    return vacations;
  }

  return vacations.filter(vacation => isVisibleVacation(vacation, currentFilters))
};

const VacationsList = ({vacations, format}) => (
  <div className="vacation-list">
    <h3>Current vacations: </h3>
    <ul>
      {(vacations || []).map(vacation =>
        <Vacation
          key={vacation.id}
          format={format}
          {...vacation}
        />
      )}
    </ul>
  </div>
);

VacationsList.propTypes = {
  dispatch: PropTypes.func,
  vacations: PropTypes.array,
  format: PropTypes.string,
};

const mapStateToProps = state => ({
  vacations: getVisibleVacations(state.vacations, state.visibilityFilters)
});

export default connect(mapStateToProps)(VacationsList)

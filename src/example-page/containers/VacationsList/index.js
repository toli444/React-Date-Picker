import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import moment from 'moment';
import { VisibilityFilters } from '../../actions';
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

const areFiltersApplied = currentFilters => currentFilters.length !== Object.keys(VisibilityFilters).length;

const getVisibleVacations = (vacations, currentFilters) => {
  if (!areFiltersApplied(currentFilters)) {
    return vacations;
  }

  return vacations.filter(vacation => isVisibleVacation(vacation, currentFilters))
};

const VacationsList = ({vacations = [], currentFilters, format}) => (
  <div className="vacation-list">
    <h3>Vacations: </h3>
    <h6>(today is: {today.format(format)})</h6>
    {vacations.length > 0 ? (
      <ul>
        {vacations.map(vacation =>
          <Vacation
            key={vacation.id}
            format={format}
            {...vacation}
          />
        )}
      </ul>
    ) : (
      areFiltersApplied(currentFilters) ? '' : <h5><b>There are no any vacations yet</b></h5>
    )}
  </div>
);

VacationsList.propTypes = {
  dispatch: PropTypes.func,
  vacations: PropTypes.array,
  format: PropTypes.string,
  currentFilters: PropTypes.array,
};

const mapStateToProps = state => ({
  vacations: getVisibleVacations(state.vacations, state.visibilityFilters),
  currentFilters: state.visibilityFilters,
});

export default connect(mapStateToProps)(VacationsList)

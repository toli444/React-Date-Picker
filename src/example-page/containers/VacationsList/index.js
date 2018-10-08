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
  [VisibilityFilters.PAST]: {
    name: 'past',
    action: isPastVacation,
  },
  [VisibilityFilters.CURRENT]: {
    name: 'current',
    action: isCurrentVacation,
  },
  [VisibilityFilters.FUTURE]: {
    name: 'future',
    action: isFutureVacation,
  },
};

const isVisibleVacation = (vacation, currentFilters) => {
  for (let filter of currentFilters) {
    if (filters[filter].action(vacation)) {
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

const capitalize = string => `${string[0].toUpperCase()}${string.slice(1)}`;

const getVacationsLabel = currentFilters => {
  if (!areFiltersApplied(currentFilters)) {
    return 'All vacations:'
  }

  return `${capitalize(currentFilters.map(filter => filters[filter].name).join(' and '))} vacations:`;
};

const VacationsList = ({vacations = [], currentFilters, format}) => (
  <div className="vacation-list">
    <h3>{getVacationsLabel(currentFilters)}</h3>
    <h6>(today is: {today.format(format)})</h6>
    {vacations.length > 0 ? (
      <ul>
        {(getVisibleVacations(vacations, currentFilters) || []).map(vacation =>
          <Vacation
            key={vacation.id}
            format={format}
            {...vacation}
          />
        )}
      </ul>
    ) : (
      <h5><b>There are no any vacations yet</b></h5>
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
  vacations: state.vacations,
  currentFilters: state.visibilityFilters,
});

export default connect(mapStateToProps)(VacationsList)

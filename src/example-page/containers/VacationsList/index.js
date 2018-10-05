import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {VisibilityFilters} from '../../actions';
import Vacation from '../../components/Vacation';

const getVisibleVacations = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_PAST:
      return todos.filter(t => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    case VisibilityFilters.SHOW_FUTURE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error('Unknown filter: ' + filter)
  }
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
  vacations: getVisibleVacations(state.vacations, state.visibilityFilter)
});

export default connect(mapStateToProps)(VacationsList)

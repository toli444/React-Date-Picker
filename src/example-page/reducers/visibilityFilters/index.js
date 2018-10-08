import { VisibilityFilters } from '../../actions'

const initialState = [VisibilityFilters.PAST, VisibilityFilters.CURRENT, VisibilityFilters.FUTURE];

const visibilityFilters = (state = initialState, {type, filter}) => {
  switch (type) {
    case 'SET_VISIBILITY_FILTER':
      return state.concat(filter);
    case 'UNSET_VISIBILITY_FILTER':
      return state.filter(currentFilter => currentFilter !== filter);
    default:
      return state;
  }
};

export default visibilityFilters;

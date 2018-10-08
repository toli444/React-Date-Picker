import {combineReducers} from 'redux'
import vacations from './vacations';
import visibilityFilters from './visibilityFilters';


export default combineReducers({
  vacations,
  visibilityFilters,
});

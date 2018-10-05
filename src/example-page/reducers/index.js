import {combineReducers} from 'redux'
import vacations from './vacations';
import visibilityFilter from './visibilityFilter';


export default combineReducers({
  vacations,
  visibilityFilter
});

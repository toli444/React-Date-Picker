import {withStateHandlers} from "recompose";

const resetForm = (_, {name = '', startDate = null, endDate = null}) => () => ({
  name,
  startDate,
  endDate,
});

const handleNameChange = () => value => ({name: value});

const handleStartDateChange = () => value => ({startDate: value});

const handleEndDateChange = () => value => ({endDate: value});

const withState = withStateHandlers(({name = '', startDate = null, endDate = null}) => ({
  name,
  startDate,
  endDate,
}), {
  handleNameChange,
  handleStartDateChange,
  handleEndDateChange,
  resetForm,
});

export default withState;

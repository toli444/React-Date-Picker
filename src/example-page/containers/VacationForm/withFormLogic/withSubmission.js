import {withHandlers} from "recompose";
import {addVacation, updateVacation} from "../../../actions";

const handleSubmit = ({id, name, startDate, endDate, dispatch, resetForm, history}, e) => {
  e.preventDefault();

  if (id) {
    dispatch(updateVacation({id, name, startDate, endDate}));
  } else {
    dispatch(addVacation({name, startDate, endDate}));
  }
  resetForm();
  cancelForm(history);
};

const cancelForm = (history) => history.push('/example');

const withSubmission = withHandlers({
  handleSubmit: props => e => handleSubmit(props, e),
  cancelForm: props => () => cancelForm(props.history),
});

export default withSubmission;

import {withHandlers} from "recompose";
import {addVacation} from "../../../actions";

const handleSubmit = ({name, startDate, endDate, dispatch, resetForm, history}, e) => {
  e.preventDefault();

  dispatch(addVacation({name, startDate, endDate}));
  resetForm();
  cancelForm(history);
};

const cancelForm = (history) => history.push('/example');

const withSubmission = withHandlers({
  handleSubmit: props => e => handleSubmit(props, e),
  cancelForm: props => () => cancelForm(props.history),
});

export default withSubmission;

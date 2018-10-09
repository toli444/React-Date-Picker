import {withHandlers} from "recompose";
import {addVacation} from "../../../actions";

const handleSubmit = ({name, startDate, endDate, dispatch, resetForm}, e) => {
  e.preventDefault();

  dispatch(addVacation({name, startDate, endDate}));
  resetForm();
};

const withSubmission = withHandlers({
  handleSubmit: props => e => handleSubmit(props, e),
});

export default withSubmission;

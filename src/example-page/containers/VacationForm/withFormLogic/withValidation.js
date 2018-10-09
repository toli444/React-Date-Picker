import {withHandlers} from "recompose";

const isFormValid = ({name, startDate, endDate}) => (
  !name.trim() || !startDate || !endDate
);

const withValidation = withHandlers({
  isFormValid: props => () => isFormValid(props),
});

export default withValidation;

import { compose } from "recompose";
import { connect } from 'react-redux'

import withState from './withState';
import withSubmission from './withSubmission';
import withValidation from './withValidation';
import withInitialValues from './withInitialValues';

const mapStateToProps = state => ({
  vacations: state.vacations,
});

export default compose(
  connect(mapStateToProps),
  withInitialValues,
  withState,
  withValidation,
  withSubmission,
);

import { compose } from "recompose";
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";

import withState from './withState';
import withSubmission from './withSubmission';
import withValidation from './withValidation';
import withInitialValues from './withInitialValues';

const mapStateToProps = state => ({
  vacations: state.vacations,
});

export default compose(
  connect(mapStateToProps),
  withRouter,
  withInitialValues,
  withState,
  withValidation,
  withSubmission,
);

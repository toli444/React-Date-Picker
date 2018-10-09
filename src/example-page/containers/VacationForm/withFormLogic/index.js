import { compose } from "recompose";
import { connect } from 'react-redux'

import withState from './withState';
import withSubmission from './withSubmission';
import withValidation from './withValidation';

export default compose(
  connect(),
  withState,
  withValidation,
  withSubmission,
);

import {withProps} from "recompose";

const withInitialValues = withProps(({id, vacations}) => {
  const vacation = (vacations || []).find(vacation => vacation.id === id);

  if (vacation) {
    return {...vacation};
  }
});

export default withInitialValues;

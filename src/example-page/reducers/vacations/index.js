const vacations = (state = [], {type, payload}) => {
  switch (type) {
    case 'ADD_VACATION':
      return state.concat(payload);
    case 'UPDATE_VACATION':
      return state.map(vacation => vacation.id === payload.id ? {...vacation, ...payload}: vacation);
    default:
      return state;
  }
};

export default vacations;

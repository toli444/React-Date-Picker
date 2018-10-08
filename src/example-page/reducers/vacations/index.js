const vacations = (state = [], {type, payload}) => {
  switch (type) {
    case 'ADD_VACATION':
      return [
        ...state, {
          id: payload.id,
          name: payload.name,
          startDate: payload.startDate.clone(),
          endDate: payload.endDate.clone(),
        }
      ];
    default:
      return state;
  }
};

export default vacations;

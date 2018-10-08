const vacations = (state = [], {type, payload}) => {
  switch (type) {
    case 'ADD_VACATION':
      return [
        ...state, {
          id: payload.id,
          name: payload.name,
          startDate: payload.startDate,
          endDate: payload.endDate,
          completed: false
        }
      ];
    default:
      return state;
  }
};

export default vacations;

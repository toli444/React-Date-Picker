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
    case 'TOGGLE_VACATION':
      return state.map(vacation =>
        (vacation.id === payload.id)
          ? {...vacation, completed: !payload.completed}
          : vacation
      );
    default:
      return state;
  }
};

export default vacations;

let nextVacationId = 0;

export const addVacation = payload => ({
  type: 'ADD_VACATION',
  payload: {id: nextVacationId++, ...payload},
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_PAST: 'SHOW_PAST',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
  SHOW_FUTURE: 'SHOW_FUTURE',
};

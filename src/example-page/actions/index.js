let nextVacationId = 1;

export const addVacation = payload => ({
  type: 'ADD_VACATION',
  payload: {id: nextVacationId++, ...payload},
});

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
});

export const unsetVisibilityFilter = filter => ({
  type: 'UNSET_VISIBILITY_FILTER',
  filter
});

export const VisibilityFilters = {
  PAST: 'PAST',
  CURRENT: 'CURRENT',
  FUTURE: 'FUTURE',
};

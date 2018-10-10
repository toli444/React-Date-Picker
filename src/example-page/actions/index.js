let nextVacationId = 1;

export const addVacation = payload => ({
  type: 'ADD_VACATION',
  payload: {id: nextVacationId++, ...payload},
});

export const updateVacation = payload => ({
  type: 'UPDATE_VACATION',
  payload
});

export const deleteVacation = payload => ({
  type: 'DELETE_VACATION',
  payload
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

import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to add a vacation', () => {
    expect(actions.addVacation({name: 'Peter'})).toEqual({
      type: 'ADD_VACATION',
      payload: {
        id: 0,
        name: 'Peter',
      }
    });
    expect(actions.addVacation({name: 'Boris'})).toEqual({
      type: 'ADD_VACATION',
      payload: {
        id: 1,
        name: 'Boris',
      }
    });
    expect(actions.addVacation()).toEqual({
      type: 'ADD_VACATION',
      payload: { id: 2 }
    });
  });

  it('should create an action to set filter', () => {
    expect(actions.setVisibilityFilter(actions.VisibilityFilters.CURRENT)).toEqual({
      type: 'SET_VISIBILITY_FILTER',
      filter: actions.VisibilityFilters.CURRENT
    });
  });

  it('should create an action to unset filter', () => {
    expect(actions.unsetVisibilityFilter(actions.VisibilityFilters.CURRENT)).toEqual({
      type: 'UNSET_VISIBILITY_FILTER',
      filter: actions.VisibilityFilters.CURRENT
    });
  })
});

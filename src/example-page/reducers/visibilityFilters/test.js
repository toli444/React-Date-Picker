import visibilityFilters from '../visibilityFilters';
import {VisibilityFilters} from '../../actions';

describe('visibilityFilters reducer', () => {
  it('should return the initial state', () => {
    expect(visibilityFilters(undefined, {})).toEqual(
      [VisibilityFilters.PAST, VisibilityFilters.CURRENT, VisibilityFilters.FUTURE]
    );
  });

  it('should handle SET_VISIBILITY_FILTER', () => {
    expect(
      visibilityFilters([], {
        type: 'SET_VISIBILITY_FILTER',
        filter: VisibilityFilters.FUTURE,
      })
    ).toEqual([VisibilityFilters.FUTURE]);

    expect(
      visibilityFilters([VisibilityFilters.PAST, VisibilityFilters.CURRENT], {
        type: 'SET_VISIBILITY_FILTER',
        filter: VisibilityFilters.FUTURE,
      })
    ).toEqual([VisibilityFilters.PAST, VisibilityFilters.CURRENT, VisibilityFilters.FUTURE]);
  });

  it('should handle UNSET_VISIBILITY_FILTER', () => {
    expect(
      visibilityFilters(undefined, {
        type: 'UNSET_VISIBILITY_FILTER',
        filter: VisibilityFilters.FUTURE,
      })
    ).toEqual([VisibilityFilters.PAST, VisibilityFilters.CURRENT]);

    expect(
      visibilityFilters([VisibilityFilters.PAST, VisibilityFilters.CURRENT], {
        type: 'UNSET_VISIBILITY_FILTER',
        filter: VisibilityFilters.CURRENT,
      })
    ).toEqual([VisibilityFilters.PAST]);

    expect(
      visibilityFilters([VisibilityFilters.PAST, VisibilityFilters.CURRENT], {
        type: 'UNSET_VISIBILITY_FILTER',
        filter: VisibilityFilters.FUTURE,
      })
    ).toEqual([VisibilityFilters.PAST, VisibilityFilters.CURRENT]);

    expect(
      visibilityFilters([], {
        type: 'UNSET_VISIBILITY_FILTER',
        filter: VisibilityFilters.FUTURE,
      })
    ).toEqual([]);

    expect(
      visibilityFilters([], {
        type: 'UNSET_VISIBILITY_FILTER',
        filter: null,
      })
    ).toEqual([]);
  });
});

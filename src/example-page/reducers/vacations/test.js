import moment from 'moment';
import vacations from '../vacations';

const format = 'DD/MM/YYYY';

describe('vacations reducer', () => {
  it('should return the initial state', () => {
    expect(vacations(undefined, {})).toEqual([]);
  });

  it('should handle ADD_VACATION', () => {
    expect(
      vacations([], {
        type: 'ADD_VACATION',
        payload: {
          id: 0,
          name: 'Anatoly',
          startDate: moment('28/07/2018', format),
          endDate: moment('30/07/2018', format)
        }
      })
    ).toEqual([{
      id: 0,
      name: 'Anatoly',
      startDate: moment('28/07/2018', format),
      endDate: moment('30/07/2018', format)
    }]);

    expect(
      vacations([{
        id: 0,
        name: 'Anatoly',
        startDate: moment('28/07/2018', format),
        endDate: moment('30/07/2018', format)
      }], {
        type: 'ADD_VACATION',
        payload: {
          id: 1,
          name: 'Boris',
          startDate: moment('29/07/2018', format),
          endDate: moment('31/07/2018', format)
        }
      })
    ).toEqual([{
      id: 0,
      name: 'Anatoly',
      startDate: moment('28/07/2018', format),
      endDate: moment('30/07/2018', format)
    }, {
      id: 1,
      name: 'Boris',
      startDate: moment('29/07/2018', format),
      endDate: moment('31/07/2018', format)
    }])
  });
});

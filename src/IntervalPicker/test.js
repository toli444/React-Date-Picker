import React from 'react';
import { shallow } from 'enzyme';
import IntervalPicker from '../IntervalPicker';
import moment from "moment";

const format = 'DD/MM/YYYY';

describe('IntervalPicker', () => {
  const RealDate = Date;

  const mockDate = isoDate => {
    global.Date = class extends RealDate {
      constructor () {
        super();

        return new RealDate(isoDate)
      }
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
    global.Date = RealDate
  });

  it('renders correctly', () => {
    mockDate('2017-11-25T12:34:56z');
    const wrapper  = shallow(<IntervalPicker />);

    expect(wrapper).toMatchSnapshot();
  });

  it('componentDidMount', () => {
    const onStartDateChangeStub = jest.fn();
    const onEndDateChangeStub = jest.fn();
    const startDate = moment('28/07/1997', format);
    const endDate = moment('29/07/1997', format);
    const wrapper  = shallow(<IntervalPicker
      onStartDateChange={onStartDateChangeStub}
      onEndDateChange={onEndDateChangeStub}
      startDate={startDate}
      endDate={endDate}
    />);

    wrapper.instance().componentDidMount();
    expect(onStartDateChangeStub).toBeCalledWith(startDate);
    expect(onEndDateChangeStub).toBeCalledWith(endDate);
  });

  it('handleStartDateChange', () => {
    const onStartDateChangeStub = jest.fn();
    const wrapper  = shallow(<IntervalPicker
      onStartDateChange={onStartDateChangeStub}
    />);
    const instance = wrapper.instance();
    instance.endDatePickerRef.current = { focusIn: jest.fn() };

    const execTestCase = (startDate, endDate, expectedEndDate = endDate) => {
      instance.state.endDate = endDate;
      instance.handleStartDateChange(startDate);
      expect(onStartDateChangeStub).toBeCalledWith(startDate);
      expect(instance.state.endDate).toBe(expectedEndDate);
      expect(instance.endDatePickerRef.current.focusIn).toBeCalled();
      jest.clearAllMocks();
    };

    execTestCase(moment('28/07/1997', format), moment('29/07/1997', format));
    execTestCase(moment('29/07/1997', format), moment('29/07/1997', format), null);
    execTestCase(moment('30/07/1997', format), moment('29/07/1997', format), null);
  });

  it('handleEndDateChange', () => {
    const onEndDateChangeStub = jest.fn();
    const wrapper  = shallow(<IntervalPicker
      onEndDateChange={onEndDateChangeStub}
    />);
    const instance = wrapper.instance();

    const execTestCase = (newEndDate, expectedStateEndDate = newEndDate) => {
      instance.handleEndDateChange(newEndDate);
      expect(instance.state.endDate).toBe(expectedStateEndDate);
      expect(onEndDateChangeStub).toBeCalledWith(newEndDate);
      jest.clearAllMocks();
    };

    execTestCase(moment('28/07/1997', format));
    execTestCase(moment('29/07/1997', format));
    execTestCase(moment('30/07/1997', format));
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import IntervalPicker from './index';
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

  it('handleStartDateChange', () => {
    const onStartDateChangeStub = jest.fn();
    const onEndDateChangeStub = jest.fn();
    const wrapper  = shallow(<IntervalPicker
      onStartDateChange={onStartDateChangeStub}
      onEndDateChange={onEndDateChangeStub}
    />);
    const instance = wrapper.instance();
    instance.endDatePickerRef.current = { focusIn: jest.fn() };

    const execTestCase = (startDate, endDate, endDateShouldBeCalled) => {
      wrapper.setProps({ endDate });
      instance.handleStartDateChange(startDate);
      expect(onStartDateChangeStub).toBeCalledWith(startDate);
      endDateShouldBeCalled && expect(onEndDateChangeStub).toBeCalledWith(startDate);
      setImmediate(() => {expect(instance.endDatePickerRef.current.focusIn).toBeCalled()});
      jest.clearAllMocks();
    };

    execTestCase(moment('28/07/1997', format), moment('29/07/1997', format));
    execTestCase(moment('29/07/1997', format), moment('29/07/1997', format), true);
    execTestCase(moment('30/07/1997', format), moment('29/07/1997', format), true);
  });
});

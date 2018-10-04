import React from 'react';
import DatePicker from '../DatePicker';
import { shallow, mount } from 'enzyme';

import moment from "moment";

const format = 'DD/MM/YYYY';

describe('DatePicker', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    const wrapper  = shallow(<DatePicker />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with focusIn', () => {
    const wrapper  = shallow(<DatePicker />);
    wrapper.instance().onFocusHandler();
    wrapper.update();

    expect(wrapper).toMatchSnapshot();
  });

  it('getCurrentDate', () => {
    const startDate = moment('28/07/1997', format);
    const value = moment('29/07/1997', format);
    const wrapper  = shallow(<DatePicker
      format={format}
      startDate={startDate}
      value={value}
    />);
    const instance = wrapper.instance();

    expect(instance.getCurrentDate()).toEqual(value);
    wrapper.setProps({ startDate: null, value});
    expect(instance.getCurrentDate()).toEqual(value);
    wrapper.setProps({ startDate, value: null});
    expect(instance.getCurrentDate()).toEqual(startDate);
    wrapper.setProps({ startDate: null, value: null});
    expect(instance.getCurrentDate()).toEqual(null);
    wrapper.setProps({ startDate: undefined, value: undefined});
    expect(instance.getCurrentDate()).toEqual(null);
  });

  it('addDate', () => {
    const wrapper  = shallow(<DatePicker value={moment('28/07/1997', format)} />);
    const instance = wrapper.instance();

    expect(instance.state.currentDate.format()).toEqual("1997-07-28T00:00:00+03:00");
    instance.addDate(1, 'month');
    expect(instance.state.currentDate.format()).toEqual("1997-08-28T00:00:00+03:00");
    instance.addDate(1, 'year');
    expect(instance.state.currentDate.format()).toEqual("1998-08-28T00:00:00+03:00");
    instance.addDate(10, 'year');
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.addDate(0, 'year');
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.addDate();
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.addDate(1, 'blabla');
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
  });

  it('subDate', () => {
    const wrapper  = shallow(<DatePicker value={moment('28/08/2008', format)} />);
    const instance = wrapper.instance();

    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.subDate(1, 'blabla');
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.subDate();
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.subDate(0, 'year');
    expect(instance.state.currentDate.format()).toEqual("2008-08-28T00:00:00+03:00");
    instance.subDate(10, 'year');
    expect(instance.state.currentDate.format()).toEqual("1998-08-28T00:00:00+03:00");
    instance.subDate(1, 'year');
    expect(instance.state.currentDate.format()).toEqual("1997-08-28T00:00:00+03:00");
    instance.subDate(1, 'month');
    expect(instance.state.currentDate.format()).toEqual("1997-07-28T00:00:00+03:00");
  });

  it('onBlurHandler', () => {
    const wrapper  = mount(<DatePicker />);
    const instance = wrapper.instance();

    expect(instance.blurTimeout).toEqual(null);
    expect(instance.state.isFocusIn).toEqual(null);
    instance.onBlurHandler();
    jest.runAllTimers();
    expect(instance.blurTimeout).not.toBe(false);
    expect(instance.state.isFocusIn).toEqual(false);
    jest.clearAllTimers()
  });

  it('onFocusHandler', () => {
    const wrapper  = mount(<DatePicker />);
    const instance = wrapper.instance();

    instance.getCurrentDate = jest.fn().mockReturnValue(moment('28/08/2008', format));
    instance.blurTimeout = setTimeout(() => {});

    expect(instance.blurTimeout).not.toBe(false);
    expect(instance.state.isFocusIn).toEqual(null);
    expect(instance.state.currentDate).toEqual(null);
    instance.onFocusHandler();
    expect(clearTimeout).toHaveBeenCalledWith(instance.blurTimeout);
    expect(instance.state.isFocusIn).toEqual(true);
    expect(instance.state.currentDate).toEqual(moment('28/08/2008', format));
    jest.clearAllTimers()
  });

  it('handleDateChange', () => {
    const onDateChangeMock = jest.fn();
    const wrapper  = mount(<DatePicker
      onDateChange={onDateChangeMock}
    />);
    const instance = wrapper.instance();

    expect(instance.state.isFocusIn).toEqual(null);
    expect(instance.state.currentDate).toEqual(null);
    instance.handleDateChange(moment('28/08/2008', format));
    expect(onDateChangeMock).toHaveBeenCalledWith(moment('28/08/2008', format));
    expect(instance.state.isFocusIn).toEqual(false);
    expect(instance.state.currentDate).toEqual(moment('28/08/2008', format));

    jest.clearAllMocks();

    expect(instance.state.isFocusIn).toEqual(false);
    expect(instance.state.currentDate).toEqual(moment('28/08/2008', format));
    instance.handleDateChange(null);
    expect(onDateChangeMock).toHaveBeenCalledWith(null);
    expect(instance.state.isFocusIn).toEqual(false);
    expect(instance.state.currentDate).toEqual(null);
  });
});

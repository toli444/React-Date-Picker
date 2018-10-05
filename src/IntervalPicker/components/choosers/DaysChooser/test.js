import React from 'react';
import DaysChooser from '../DaysChooser';
import {shallow} from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';

const format = 'DD/MM/YYYY';

describe('DaysChooser', () => {
  beforeEach(() => {
    MockDate.set(moment('28/07/1997', format));
  });

  afterEach(() => {
    MockDate.reset();
    jest.clearAllMocks();
  });

  it('renders correctly with only required props', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('20/07/1997', format)}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with custom min and max date', () => {
    const wrapper = shallow(<DaysChooser
      currentDate={moment('20/07/1997', format)}
      minDate={moment('10/07/1997', format)}
      maxDate={moment('30/07/1997', format)}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with custom min and max date, start date and end date', () => {
    const wrapper = shallow(<DaysChooser
      currentDate={moment('20/07/1997', format)}
      startDate={moment('15/07/1997', format)}
      endDate={moment('25/07/1997', format)}
      minDate={moment('10/07/1997', format)}
      maxDate={moment('30/07/1997', format)}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with other format', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('20/07/1997', format)} format={'DD.MM.YYYY'}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('boundary values are not disabled', () => {
    const wrapper = shallow(<DaysChooser
      currentDate={moment('20/07/1997', format)}
      startDate={moment('15/07/1997', format)}
      endDate={moment('25/07/1997', format)}
      minDate={moment('14/07/1997', format)}
      maxDate={moment('16/07/1997', format)}
    />);

    expect(wrapper.find('.day').findWhere(node => node.type() === 'span' && node.text() === '14').hasClass('disabled')).toBeFalsy();
    expect(wrapper.find('.day').findWhere(node => node.type() === 'span' && node.text() === '16').hasClass('disabled')).toBeFalsy();
    expect(wrapper.find('.day').findWhere(node => node.type() === 'span' && node.text() === '13').hasClass('disabled')).toBeTruthy();
    expect(wrapper.find('.day').findWhere(node => node.type() === 'span' && node.text() === '17').hasClass('disabled')).toBeTruthy();
  });

  describe('onDateChange is called when click on enabled element', () => {
    let wrapper;
    const onDateChange = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<DaysChooser
        currentDate={moment('20/07/1997', format)}
        startDate={moment('15/07/1997', format)}
        endDate={moment('25/07/1997', format)}
        minDate={moment('10/06/1997', format)}
        maxDate={moment('30/08/1997', format)}
        onDateChange={onDateChange}
      />);
    });

    it('click on regular', () => {
      wrapper.find('.day').not('.disabled').first().simulate('click');
      expect(onDateChange).toHaveBeenCalledTimes(1);
    });

    it('click on another-month', () => {
      wrapper.find('.day.another-month').not('.disabled').first().simulate('click');
      expect(onDateChange).toHaveBeenCalledTimes(1);
    });

    it('click on selected', () => {
      wrapper.find('.day.selected').not('.disabled').first().simulate('click');
      expect(onDateChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDateChange is not called when click on disabled element', () => {
    let wrapper;
    const onDateChange = jest.fn();

    beforeEach(() => {
      wrapper = shallow(<DaysChooser
        currentDate={moment('20/07/1997', format)}
        startDate={moment('15/07/1997', format)}
        endDate={moment('25/07/1997', format)}
        minDate={moment('10/06/1997', format)}
        maxDate={moment('30/07/1997', format)}
        onDateChange={onDateChange}
      />);
    });

    it('click on regular', () => {
      wrapper.find('.day.disabled').first().simulate('click');
      expect(onDateChange).toHaveBeenCalledTimes(0);
    });

    it('click on regular', () => {
      wrapper.find('.day.another-month.disabled').first().simulate('click');
      expect(onDateChange).toHaveBeenCalledTimes(0);
    });
  });

  it('getDaysToShow', () => {
    const currentDate = moment('20/07/1997', format);
    const wrapper = shallow(<DaysChooser currentDate={currentDate} />);
    const instance = wrapper.instance();
    const getStartOfWeekMonthSpy = jest.spyOn(instance, 'getStartOfWeekMonth');
    const getEndOfWeekMonthSpy = jest.spyOn(instance, 'getEndOfWeekMonth');

    const result = instance.getDaysToShow(currentDate);

    expect(getStartOfWeekMonthSpy).toBeCalledWith(currentDate);
    expect(getEndOfWeekMonthSpy).toBeCalledWith(currentDate);

    expect(result.map(date => date.format())).toEqual(["1997-06-29T00:00:00+03:00", "1997-06-30T00:00:00+03:00", "1997-07-01T00:00:00+03:00", "1997-07-02T00:00:00+03:00", "1997-07-03T00:00:00+03:00", "1997-07-04T00:00:00+03:00", "1997-07-05T00:00:00+03:00", "1997-07-06T00:00:00+03:00", "1997-07-07T00:00:00+03:00", "1997-07-08T00:00:00+03:00", "1997-07-09T00:00:00+03:00", "1997-07-10T00:00:00+03:00", "1997-07-11T00:00:00+03:00", "1997-07-12T00:00:00+03:00", "1997-07-13T00:00:00+03:00", "1997-07-14T00:00:00+03:00", "1997-07-15T00:00:00+03:00", "1997-07-16T00:00:00+03:00", "1997-07-17T00:00:00+03:00", "1997-07-18T00:00:00+03:00", "1997-07-19T00:00:00+03:00", "1997-07-20T00:00:00+03:00", "1997-07-21T00:00:00+03:00", "1997-07-22T00:00:00+03:00", "1997-07-23T00:00:00+03:00", "1997-07-24T00:00:00+03:00", "1997-07-25T00:00:00+03:00", "1997-07-26T00:00:00+03:00", "1997-07-27T00:00:00+03:00", "1997-07-28T00:00:00+03:00", "1997-07-29T00:00:00+03:00", "1997-07-30T00:00:00+03:00", "1997-07-31T00:00:00+03:00", "1997-08-01T00:00:00+03:00", "1997-08-02T00:00:00+03:00"]);
    expect(instance.getDaysToShow(null)).toEqual([]);

    //call with today
    expect(instance.getDaysToShow().map(date => date.format())).toEqual(["1997-06-29T00:00:00+03:00", "1997-06-30T00:00:00+03:00", "1997-07-01T00:00:00+03:00", "1997-07-02T00:00:00+03:00", "1997-07-03T00:00:00+03:00", "1997-07-04T00:00:00+03:00", "1997-07-05T00:00:00+03:00", "1997-07-06T00:00:00+03:00", "1997-07-07T00:00:00+03:00", "1997-07-08T00:00:00+03:00", "1997-07-09T00:00:00+03:00", "1997-07-10T00:00:00+03:00", "1997-07-11T00:00:00+03:00", "1997-07-12T00:00:00+03:00", "1997-07-13T00:00:00+03:00", "1997-07-14T00:00:00+03:00", "1997-07-15T00:00:00+03:00", "1997-07-16T00:00:00+03:00", "1997-07-17T00:00:00+03:00", "1997-07-18T00:00:00+03:00", "1997-07-19T00:00:00+03:00", "1997-07-20T00:00:00+03:00", "1997-07-21T00:00:00+03:00", "1997-07-22T00:00:00+03:00", "1997-07-23T00:00:00+03:00", "1997-07-24T00:00:00+03:00", "1997-07-25T00:00:00+03:00", "1997-07-26T00:00:00+03:00", "1997-07-27T00:00:00+03:00", "1997-07-28T00:00:00+03:00", "1997-07-29T00:00:00+03:00", "1997-07-30T00:00:00+03:00", "1997-07-31T00:00:00+03:00", "1997-08-01T00:00:00+03:00", "1997-08-02T00:00:00+03:00"]);

    MockDate.set(moment('28/08/1997', format));
    //call with another today
    expect(instance.getDaysToShow().map(date => date.format())).toEqual(["1997-07-27T00:00:00+03:00", "1997-07-28T00:00:00+03:00", "1997-07-29T00:00:00+03:00", "1997-07-30T00:00:00+03:00", "1997-07-31T00:00:00+03:00", "1997-08-01T00:00:00+03:00", "1997-08-02T00:00:00+03:00", "1997-08-03T00:00:00+03:00", "1997-08-04T00:00:00+03:00", "1997-08-05T00:00:00+03:00", "1997-08-06T00:00:00+03:00", "1997-08-07T00:00:00+03:00", "1997-08-08T00:00:00+03:00", "1997-08-09T00:00:00+03:00", "1997-08-10T00:00:00+03:00", "1997-08-11T00:00:00+03:00", "1997-08-12T00:00:00+03:00", "1997-08-13T00:00:00+03:00", "1997-08-14T00:00:00+03:00", "1997-08-15T00:00:00+03:00", "1997-08-16T00:00:00+03:00", "1997-08-17T00:00:00+03:00", "1997-08-18T00:00:00+03:00", "1997-08-19T00:00:00+03:00", "1997-08-20T00:00:00+03:00", "1997-08-21T00:00:00+03:00", "1997-08-22T00:00:00+03:00", "1997-08-23T00:00:00+03:00", "1997-08-24T00:00:00+03:00", "1997-08-25T00:00:00+03:00", "1997-08-26T00:00:00+03:00", "1997-08-27T00:00:00+03:00", "1997-08-28T00:00:00+03:00", "1997-08-29T00:00:00+03:00", "1997-08-30T00:00:00+03:00", "1997-08-31T00:00:00+03:00", "1997-09-01T00:00:00+03:00", "1997-09-02T00:00:00+03:00", "1997-09-03T00:00:00+03:00", "1997-09-04T00:00:00+03:00", "1997-09-05T00:00:00+03:00", "1997-09-06T00:00:00+03:00"]);
  });

  it('getStartOfWeekMonth', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('20/07/1997', format)} />);
    const instance = wrapper.instance();

    expect(instance.getStartOfWeekMonth(moment('20/07/1997', format)).format()).toEqual("1997-06-29T00:00:00+03:00");
    expect(instance.getStartOfWeekMonth(null).format()).toEqual("Invalid date");
    expect(instance.getStartOfWeekMonth().format()).toEqual("1997-06-29T00:00:00+03:00");
  });

  it('getEndOfWeekMonth', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('20/07/1997', format)} />);
    const instance = wrapper.instance();

    expect(instance.getEndOfWeekMonth(moment('20/07/1997', format)).format()).toEqual("1997-08-02T23:59:59+03:00");
    expect(instance.getEndOfWeekMonth(null).format()).toEqual("Invalid date");
    expect(instance.getEndOfWeekMonth().format()).toEqual("1997-08-02T23:59:59+03:00");
  });

  it('getCombinedDaysByWeeks', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('20/07/1997', format)} />);
    const instance = wrapper.instance();

    const getExpectedObject = (value, formattedValue, isCurrentMonth) => {
      return {
        value,
        formattedValue,
        isCurrentMonth,
      }
    };

    expect(instance.getCombinedDaysByWeeks([
      moment('28/06/1997', format),
      moment('29/06/1997', format),
      moment('30/06/1997', format),
      moment('01/07/1997', format),
      moment('02/07/1997', format),
      moment('03/07/1997', format),
      moment('04/07/1997', format),
    ], moment('5/07/1997', format))).toEqual([
      [
        getExpectedObject(moment('28/06/1997', format), '28', false),
        getExpectedObject(moment('29/06/1997', format), '29', false),
        getExpectedObject(moment('30/06/1997', format), '30', false),
        getExpectedObject(moment('01/07/1997', format), '1', true),
        getExpectedObject(moment('02/07/1997', format), '2', true),
        getExpectedObject(moment('03/07/1997', format), '3', true),
        getExpectedObject(moment('04/07/1997', format), '4', true),
      ]
    ]);

    expect(instance.getCombinedDaysByWeeks([
      moment('30/06/1997', format),
      moment('01/07/1997', format),
      moment('02/07/1997', format),
    ], moment('5/07/1997', format))).toEqual([
      [
        getExpectedObject(moment('30/06/1997', format), '30', false),
        getExpectedObject(moment('01/07/1997', format), '1', true),
        getExpectedObject(moment('02/07/1997', format), '2', true),
      ]
    ]);

    expect(instance.getCombinedDaysByWeeks([
      moment('28/06/1997', format),
      moment('29/06/1997', format),
      moment('30/06/1997', format),
      moment('01/07/1997', format),
      moment('02/07/1997', format),
      moment('03/07/1997', format),
      moment('04/07/1997', format),
      moment('05/07/1997', format),
      moment('06/07/1997', format),
      moment('07/07/1997', format),
    ], moment('5/07/1997', format))).toEqual([
      [
        getExpectedObject(moment('28/06/1997', format), '28', false),
        getExpectedObject(moment('29/06/1997', format), '29', false),
        getExpectedObject(moment('30/06/1997', format), '30', false),
        getExpectedObject(moment('01/07/1997', format), '1', true),
        getExpectedObject(moment('02/07/1997', format), '2', true),
        getExpectedObject(moment('03/07/1997', format), '3', true),
        getExpectedObject(moment('04/07/1997', format), '4', true),
      ], [
        getExpectedObject(moment('05/07/1997', format), '5', true),
        getExpectedObject(moment('06/07/1997', format), '6', true),
        getExpectedObject(moment('07/07/1997', format), '7', true),
      ]
    ]);

    expect(instance.getCombinedDaysByWeeks([], moment('5/07/1997', format))).toEqual([]);
    expect(instance.getCombinedDaysByWeeks(null, moment('5/07/1997', format))).toEqual([]);
  });

  it('getAnotherMonthClass', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('20/07/1997', format)} />);
    const instance = wrapper.instance();

    expect(instance.getAnotherMonthClass({isCurrentMonth: true})).toBe('');
    expect(instance.getAnotherMonthClass({isCurrentMonth: false})).toBe('another-month');
    expect(instance.getAnotherMonthClass({})).toBe('another-month');
  });

  it('getCurrentDayClass', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('28/07/1997', format)} />);
    const instance = wrapper.instance();

    expect(instance.getCurrentDayClass({value: moment('27/07/1997', format)})).toBe('');
    expect(instance.getCurrentDayClass({value: moment('28/07/1997', format)})).toBe('current');
    expect(instance.getCurrentDayClass({value: moment('29/07/1997', format)})).toBe('');
    expect(instance.getCurrentDayClass({})).toBe('');
  });

  it('getBetweenDaysClass', () => {
    const getStartDate = () => moment('23/07/1997', format);
    const getCurrentDate = () => moment('25/07/1997', format);
    const getEndDate = () => moment('28/07/1997', format);
    const wrapper = shallow(<DaysChooser
      currentDate={getCurrentDate()}
      startDate={getStartDate()}
      endDate={getEndDate()}
    />);
    const instance = wrapper.instance();

    expect(instance.getBetweenDaysClass({value: getStartDate()})).toBe('selected');
    expect(instance.getBetweenDaysClass({value: getCurrentDate()})).toBe('selected');
    expect(instance.getBetweenDaysClass({value: getEndDate()})).toBe('selected');
    expect(instance.getBetweenDaysClass({value: getStartDate().add(1, 'day')})).toBe('selected');
    expect(instance.getBetweenDaysClass({value: getEndDate().subtract(1, 'day')})).toBe('selected');
    expect(instance.getBetweenDaysClass({})).toBe('');
  });

  it('getBorderDaysClass', () => {
    const getStartDate = () => moment('23/07/1997', format);
    const getCurrentDate = () => moment('25/07/1997', format);
    const getEndDate = () => moment('28/07/1997', format);
    const wrapper = shallow(<DaysChooser
      currentDate={getCurrentDate()}
      startDate={getStartDate()}
      endDate={getEndDate()}
    />);
    const instance = wrapper.instance();

    expect(instance.getBorderDaysClass({value: getStartDate()})).toBe('left-border');
    expect(instance.getBorderDaysClass({value: getCurrentDate()})).toBe('');
    expect(instance.getBorderDaysClass({value: getEndDate()})).toBe('right-border');
    expect(instance.getBorderDaysClass({value: getStartDate().add(1, 'day')})).toBe('');
    expect(instance.getBorderDaysClass({value: getEndDate().subtract(1, 'day')})).toBe('');
    expect(instance.getBorderDaysClass({})).toBe('');

    wrapper.setProps({ startDate: getCurrentDate(), endDate: getCurrentDate()});

    expect(instance.getBorderDaysClass({value: getStartDate()})).toBe('');
    expect(instance.getBorderDaysClass({value: getCurrentDate()})).toBe('left-border right-border');
    expect(instance.getBorderDaysClass({value: getEndDate()})).toBe('');
    expect(instance.getBorderDaysClass({value: getStartDate().add(1, 'day')})).toBe('');
    expect(instance.getBorderDaysClass({value: getEndDate().subtract(1, 'day')})).toBe('');
  });

  it('getDisabledDayClass', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('28/07/1997', format)} />);
    const instance = wrapper.instance();
    instance.isDayDisabled = jest.fn(value => value === 1);

    expect(instance.getDisabledDayClass({value: 1})).toEqual('disabled');
    expect(instance.getDisabledDayClass({value: 2})).toEqual('');
    expect(instance.getDisabledDayClass({})).toEqual('');
  });

  describe('getDayClasses', () => {
    const wrapper = shallow(<DaysChooser currentDate={moment('28/07/1997', format)} />);
    const instance = wrapper.instance();
    instance.getAnotherMonthClass = jest.fn();
    instance.getCurrentDayClass = jest.fn();
    instance.getDisabledDayClass = jest.fn();
    instance.getBetweenDaysClass = jest.fn();
    instance.getBorderDaysClass = jest.fn();

    const mockReturnValues = (first, second, third, fourth, fifth) => {
      instance.getAnotherMonthClass.mockReturnValue(first);
      instance.getCurrentDayClass.mockReturnValue(second);
      instance.getDisabledDayClass.mockReturnValue(third);
      instance.getBetweenDaysClass.mockReturnValue(fourth);
      instance.getBorderDaysClass.mockReturnValue(fifth);
    };

    const checkToBeCalledWith = value => {
      expect(instance.getAnotherMonthClass).toBeCalledWith(value);
      expect(instance.getCurrentDayClass).toBeCalledWith(value);
      expect(instance.getDisabledDayClass).toBeCalledWith(value);
      expect(instance.getBetweenDaysClass).toBeCalledWith(value);
      expect(instance.getBorderDaysClass).toBeCalledWith(value);
    };

    it('all true', () => {
      mockReturnValues('1', '2', '3', '4', '5');
      expect(instance.getDayClasses('day')).toEqual('day 1 2 3 4 5');
      checkToBeCalledWith('day');
    });

    it('some true', () => {
      mockReturnValues('1', '', '3', '', '5');
      expect(instance.getDayClasses('day')).toEqual('day 1 3 5');
      checkToBeCalledWith('day');
    });

    it('none true', () => {
      mockReturnValues('', '', '', '', '');
      expect(instance.getDayClasses('day')).toEqual('day');
      checkToBeCalledWith('day');
      expect(instance.getDayClasses(null)).toEqual('day');
      checkToBeCalledWith(null);
    });
  });

  it('isDayDisabled', () => {
    const getMinDate = () => moment('23/07/1997', format);
    const getCurrentDate = () => moment('25/07/1997', format);
    const getMaxDate = () => moment('28/07/1997', format);
    const wrapper = shallow(<DaysChooser
      currentDate={getCurrentDate()}
      minDate={getMinDate()}
      maxDate={getMaxDate()}
    />);
    const instance = wrapper.instance();

    expect(instance.isDayDisabled(getMinDate())).toEqual(false);
    expect(instance.isDayDisabled(getCurrentDate())).toEqual(false);
    expect(instance.isDayDisabled(getMaxDate())).toEqual(false);

    expect(instance.isDayDisabled(getMinDate().subtract(1, 'day'))).toEqual(true);
    expect(instance.isDayDisabled(getMaxDate().add(1, 'day'))).toEqual(true);

    expect(instance.isDayDisabled(getMinDate().add(1, 'day'))).toEqual(false);
    expect(instance.isDayDisabled(getMaxDate().subtract(1, 'day'))).toEqual(false);
  });

  it('handleDayClick', () => {
    const onDateChangeMock = jest.fn();
    const wrapper = shallow(<DaysChooser
      currentDate={moment('28/07/1997', format)}
      onDateChange={onDateChangeMock}
    />);
    const instance = wrapper.instance();
    instance.isDayDisabled = jest.fn(value => value === 'day1');

    instance.handleDayClick('day1');
    expect(onDateChangeMock.mock.calls.length).toBe(0);

    instance.handleDayClick('day2');
    expect(onDateChangeMock).toBeCalledWith('day2');
  });
});

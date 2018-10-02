import React from 'react';
import DaysChooser from '../DaysChooser';
import {shallow} from 'enzyme';
import moment from 'moment';
import MockDate from 'mockdate';

const currentDate = moment('20/07/1997', 'DD/MM/YYYY');
const startDate = moment('15/07/1997', 'DD/MM/YYYY');
const endDate = moment('25/07/1997', 'DD/MM/YYYY');
const minDate = moment('10/07/1997', 'DD/MM/YYYY');
const maxDate = moment('30/07/1997', 'DD/MM/YYYY');

describe('DaysChooser', () => {
  beforeEach(() => {
    MockDate.set(moment('28/07/1997', 'DD/MM/YYYY'));
  });

  afterEach(() => {
    MockDate.reset();
    jest.clearAllMocks();
  });

  it('renders correctly with only required props', () => {
    const wrapper = shallow(<DaysChooser currentDate={currentDate}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with custom min and max date', () => {
    const wrapper = shallow(<DaysChooser
      currentDate={currentDate}
      minDate={minDate}
      maxDate={maxDate}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with custom min and max date, start date and end date', () => {
    const wrapper = shallow(<DaysChooser
      currentDate={currentDate}
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      maxDate={maxDate}
    />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with other format', () => {
    const wrapper = shallow(<DaysChooser currentDate={currentDate} format={'DD.MM.YYYY'}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('boundary values are not disabled', () => {
    const wrapper = shallow(<DaysChooser
      currentDate={currentDate}
      startDate={startDate}
      endDate={endDate}
      minDate={moment('14/07/1997', 'DD/MM/YYYY')}
      maxDate={moment('16/07/1997', 'DD/MM/YYYY')}
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
        currentDate={currentDate}
        startDate={startDate}
        endDate={endDate}
        minDate={moment('10/06/1997', 'DD/MM/YYYY')}
        maxDate={moment('30/08/1997', 'DD/MM/YYYY')}
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
        currentDate={currentDate}
        startDate={startDate}
        endDate={endDate}
        minDate={moment('10/06/1997', 'DD/MM/YYYY')}
        maxDate={moment('30/07/1997', 'DD/MM/YYYY')}
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

    MockDate.set(moment('28/08/1997', 'DD/MM/YYYY'));
    //call with another today
    expect(instance.getDaysToShow().map(date => date.format())).toEqual(["1997-07-27T00:00:00+03:00", "1997-07-28T00:00:00+03:00", "1997-07-29T00:00:00+03:00", "1997-07-30T00:00:00+03:00", "1997-07-31T00:00:00+03:00", "1997-08-01T00:00:00+03:00", "1997-08-02T00:00:00+03:00", "1997-08-03T00:00:00+03:00", "1997-08-04T00:00:00+03:00", "1997-08-05T00:00:00+03:00", "1997-08-06T00:00:00+03:00", "1997-08-07T00:00:00+03:00", "1997-08-08T00:00:00+03:00", "1997-08-09T00:00:00+03:00", "1997-08-10T00:00:00+03:00", "1997-08-11T00:00:00+03:00", "1997-08-12T00:00:00+03:00", "1997-08-13T00:00:00+03:00", "1997-08-14T00:00:00+03:00", "1997-08-15T00:00:00+03:00", "1997-08-16T00:00:00+03:00", "1997-08-17T00:00:00+03:00", "1997-08-18T00:00:00+03:00", "1997-08-19T00:00:00+03:00", "1997-08-20T00:00:00+03:00", "1997-08-21T00:00:00+03:00", "1997-08-22T00:00:00+03:00", "1997-08-23T00:00:00+03:00", "1997-08-24T00:00:00+03:00", "1997-08-25T00:00:00+03:00", "1997-08-26T00:00:00+03:00", "1997-08-27T00:00:00+03:00", "1997-08-28T00:00:00+03:00", "1997-08-29T00:00:00+03:00", "1997-08-30T00:00:00+03:00", "1997-08-31T00:00:00+03:00", "1997-09-01T00:00:00+03:00", "1997-09-02T00:00:00+03:00", "1997-09-03T00:00:00+03:00", "1997-09-04T00:00:00+03:00", "1997-09-05T00:00:00+03:00", "1997-09-06T00:00:00+03:00"]);
  });

  it('getStartOfWeekMonth', () => {
    const wrapper = shallow(<DaysChooser currentDate={currentDate} />);
    const instance = wrapper.instance();

    expect(instance.getStartOfWeekMonth(moment('20/07/1997', 'DD/MM/YYYY')).format()).toEqual("1997-06-29T00:00:00+03:00");
    expect(instance.getStartOfWeekMonth(null).format()).toEqual("Invalid date");
    expect(instance.getStartOfWeekMonth().format()).toEqual("1997-06-29T00:00:00+03:00");
  });

  it('getEndOfWeekMonth', () => {
    const wrapper = shallow(<DaysChooser currentDate={currentDate} />);
    const instance = wrapper.instance();

    expect(instance.getEndOfWeekMonth(moment('20/07/1997', 'DD/MM/YYYY')).format()).toEqual("1997-08-02T23:59:59+03:00");
    expect(instance.getEndOfWeekMonth(null).format()).toEqual("Invalid date");
    expect(instance.getEndOfWeekMonth().format()).toEqual("1997-08-02T23:59:59+03:00");
  });
});

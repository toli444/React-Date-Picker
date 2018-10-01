import React from 'react';
import EditingDateInput from '../EditingDateInput';
import { shallow } from 'enzyme';

jest.mock('moment', () => () => ({format: () => 'today'}));

describe('EditingDateInput', () => {
  afterEach(() => {
    jest.resetAllMocks()
  });

  it('renders correctly', () => {
    const wrapper  = shallow(<EditingDateInput />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with currentDate', () => {
    const wrapper  = shallow(<EditingDateInput currentDate={'today'}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds selected class to editing month unit node', () => {
    const wrapper = shallow(<EditingDateInput editingUnit="month" currentDate={'today'}/>);

    expect(wrapper.find('.month').hasClass('selected'));
    expect(wrapper.find('.year').hasClass('selected')).toBeFalsy();
  });

  it('adds selected class to editing year unit node', () => {
    const wrapper = shallow(<EditingDateInput editingUnit="year" currentDate={'today'}/>);

    expect(wrapper.find('.month').hasClass('selected')).toBeFalsy();
    expect(wrapper.find('.year').hasClass('selected'));
  });

  it('doesn\'t add selected class if unit is not specified', () => {
    const wrapper = shallow(<EditingDateInput currentDate={'today'}/>);

    expect(wrapper.find('.month').hasClass('selected')).toBeFalsy();
    expect(wrapper.find('.year').hasClass('selected')).toBeFalsy();
  });
});

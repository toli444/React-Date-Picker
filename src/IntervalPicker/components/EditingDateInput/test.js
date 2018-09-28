import React from 'react';
import EditingDateInput from '../EditingDateInput';
import { shallow } from 'enzyme';

describe('EditingDateInput', () => {
  it('renders correctly', () => {
    const wrapper  = shallow(<EditingDateInput />);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds selected class to editing month unit node', () => {
    const wrapper = shallow(<EditingDateInput editingUnit="month"/>);

    expect(wrapper.find('.month').hasClass('selected'));
    expect(wrapper.find('.year').hasClass('selected')).toBeFalsy();
  });

  it('adds selected class to editing year unit node', () => {
    const wrapper = shallow(<EditingDateInput editingUnit="year"/>);

    expect(wrapper.find('.month').hasClass('selected')).toBeFalsy();
    expect(wrapper.find('.year').hasClass('selected'));
  });

  it('doesn\'t add selected class if unit is not specified', () => {
    const wrapper = shallow(<EditingDateInput />);

    expect(wrapper.find('.month').hasClass('selected')).toBeFalsy();
    expect(wrapper.find('.year').hasClass('selected')).toBeFalsy();
  });
});

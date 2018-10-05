import React from 'react';
import EditingDateInput from './index';
import { shallow } from 'enzyme';
import moment from 'moment';

const currentDate = moment('28/07/1997', 'DD/MM/YYYY');

describe('EditingDateInput', () => {
  it('renders correctly', () => {
    const wrapper  = shallow(<EditingDateInput />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with currentDate', () => {
    const wrapper  = shallow(<EditingDateInput currentDate={currentDate}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('adds selected class to editing month unit node', () => {
    const wrapper = shallow(<EditingDateInput editingUnit="month" currentDate={currentDate}/>);

    expect(wrapper.find('.month').hasClass('selected')).toBeTruthy();
    expect(wrapper.find('.year').hasClass('selected')).toBeFalsy();
  });

  it('adds selected class to editing year unit node', () => {
    const wrapper = shallow(<EditingDateInput editingUnit="year" currentDate={currentDate}/>);

    expect(wrapper.find('.month').hasClass('selected')).toBeFalsy();
    expect(wrapper.find('.year').hasClass('selected')).toBeTruthy();
  });

  it('doesn\'t add selected class if unit is not specified', () => {
    const wrapper = shallow(<EditingDateInput currentDate={currentDate}/>);

    expect(wrapper.find('.month').hasClass('selected')).toBeFalsy();
    expect(wrapper.find('.year').hasClass('selected')).toBeFalsy();
  });
});

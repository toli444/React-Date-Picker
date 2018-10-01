import React from 'react';
import DaysChooser from '../DaysChooser';
import {shallow} from 'enzyme';
import moment from "moment";

const currentDate = moment('20/07/1997', 'DD/MM/YYYY');
const startDate = moment('15/07/1997', 'DD/MM/YYYY');
const endDate = moment('25/07/1997', 'DD/MM/YYYY');
const minDate = moment('10/07/1997', 'DD/MM/YYYY');
const maxDate = moment('30/07/1997', 'DD/MM/YYYY');

describe('DaysChooser', () => {
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

    expect(wrapper.hostNodes().find('.day').findWhere(node => node.type() === 'span' && node.text() === '14').hasClass('disabled')).toBeFalsy();
    expect(wrapper.hostNodes().find('.day').findWhere(node => node.type() === 'span' && node.text() === '16').hasClass('disabled')).toBeFalsy();
    expect(wrapper.hostNodes().find('.day').findWhere(node => node.type() === 'span' && node.text() === '13').hasClass('disabled')).toBeTruthy();
    expect(wrapper.hostNodes().find('.day').findWhere(node => node.type() === 'span' && node.text() === '17').hasClass('disabled')).toBeTruthy();
  });

  // describe('onDateChange is called when click on enabled element', () => {
  //   it('click on regular');
  //
  //   it('click on next-month');
  //
  //   it('click on today');
  // });
  //
  // describe('onDateChange is not called when click on disabled element', () => {
  //   it('click on regular');
  //
  //   it('click on next-month');
  //
  //   it('click on today');
  // });
});

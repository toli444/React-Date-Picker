import React from 'react';
import { shallow } from 'enzyme';
import Arrow from '../Arrow';

describe('SingleArrow', () => {
  it('renders correctly', () => {
    const wrapper  = shallow(<Arrow />);

    expect(wrapper).toMatchSnapshot();
  });
});

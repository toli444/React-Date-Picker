import React from 'react';
import { shallow } from 'enzyme';
import Arrow from './index';

describe('SingleArrow', () => {
  it('renders correctly', () => {
    const wrapper  = shallow(<Arrow />);

    expect(wrapper).toMatchSnapshot();
  });

  it('getArrow', () => {
    const wrapper  = shallow(<Arrow />);
    const instance = wrapper.instance();

    expect(instance.getArrow()).toEqual('>');
    wrapper.setProps({ left: true});
    expect(instance.getArrow()).toEqual('<');
    wrapper.setProps({ left: true, double: true});
    expect(instance.getArrow()).toEqual('<<');
    wrapper.setProps({ left: false, double: true});
    expect(instance.getArrow()).toEqual('>>');
  });
});

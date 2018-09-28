import React from 'react';
import SingleArrow from '../SingleArrow';
import { shallow } from 'enzyme';

describe('SingleArrow', () => {
  it('renders correctly', () => {
    const wrapper  = shallow(<SingleArrow />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders left arrow if left', () => {
    const wrapper = shallow(<SingleArrow left/>);

    expect(wrapper.get(0).props.children).toEqual('<');
  });

  it('renders right arrow otherwise', () => {
    const wrapper = shallow(<SingleArrow />);

    expect(wrapper.get(0).props.children).toEqual('>');
  });

  it ('calls correct function when click', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <SingleArrow onClick={onClickMock}/>,
    );

    wrapper.simulate('click');

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

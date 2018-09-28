import React from 'react';
import DoubleArrow from '../DoubleArrow';
import { shallow } from 'enzyme';

describe('DoubleArrow', () => {
  it('renders correctly', () => {
    const wrapper  = shallow(<DoubleArrow />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders double left arrow if left', () => {
    const wrapper = shallow(<DoubleArrow left/>);

    expect(wrapper.get(0).props.children).toEqual('<<');
  });

  it('renders double right arrow otherwise', () => {
    const wrapper = shallow(<DoubleArrow />);

    expect(wrapper.get(0).props.children).toEqual('>>');
  });

  it ('calls correct function when click', () => {
    const onClickMock = jest.fn();
    const wrapper = shallow(
      <DoubleArrow onClick={onClickMock}/>,
    );

    wrapper.simulate('click');

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});

import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Inventory from '../../client/src/components/Inventory.jsx';
configure({adapter: new Adapter()})

describe('Inventory', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Inventory/>);
  })
  it('should render a <div>', () => {
    expect(wrapper.find('div').length).toEqual(5);
  })
  it('should render a <div>', () => {
    expect(wrapper.find('div').length).toEqual(5);
  })
})


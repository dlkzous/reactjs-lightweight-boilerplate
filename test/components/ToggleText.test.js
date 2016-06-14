import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import expect from 'expect.js';
import ToggleText from '../../src/js/components/ToggleText';

describe('<ToggleText />', () => {
  it('should display the text passed from props', (done) => {
    const props = {
      label: 'Test component',
      completed: false,
      onClick: () => {}
    };
    const wrapper = mount(<ToggleText {...props} />);
    expect(wrapper.text()).to.contain('Test component');
    expect(wrapper.find('p').hasClass('completed')).to.be(false);
    done();
  });

  it('should set classname depending on whether its completed or not', (done) => {
    const props = {
      label: 'Test component',
      completed: true,
      onClick: () => {}
    };
    const wrapper = mount(<ToggleText {...props} />);
    expect(wrapper.find('p').hasClass('completed')).to.be(true);
    done();
  });

  it('should call the relevant function on clicking of the component', (done) => {
    const onClick = sinon.spy();
    const props = {
      label: 'Test component',
      completed: true,
      onClick
    };
    const wrapper = mount(<ToggleText {...props} />);
    wrapper.find('p').simulate('click');
    expect(onClick.calledOnce).to.be(true);
    done();
  });
});

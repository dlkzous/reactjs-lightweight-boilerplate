import React from 'react';
import { mount } from 'enzyme';
import expect from 'expect.js';
import ConnectToStore from '../../src/js/utils/ConnectToStore';
import Actions from '../../src/js/actions/ActionCreator';
import Store from '../../src/js/stores/Store';

describe('<ConnectToStore />', () => {
  let TestComponent;

  beforeEach(() => {
    const stateCallback = () => {
      const { items } = Store.getAll();
      const location = items[items.length - 1].city;
      return {
        name: 'Test Name',
        location
      };
    };

    // Create react component to wrap
    const Component = (props) => {
      const { name, location, label } = props;
      return (
        <div>
          <p className="name">{name}</p>
          <p className="location">{location}</p>
          <p className="label">{label}</p>
        </div>
      );
    };
    Component.propTypes = {
      name: React.PropTypes.string.isRequired,
      location: React.PropTypes.string.isRequired,
      label: React.PropTypes.string.isRequired
    };
    TestComponent = ConnectToStore(Component, stateCallback);
  });

  it('should add the relevant state and props', (done) => {
    const wrapper = mount(<TestComponent label="Test Label" />);
    expect(wrapper.find('.name').text()).to.contain('Test Name');
    expect(wrapper.find('.location').text()).to.contain('New York');
    expect(wrapper.find('.label').text()).to.contain('Test Label');
    done();
  });

  it('should change state when the store is updated', (done) => {
    const wrapper = mount(<TestComponent label="Test Label" />);
    Actions.addItem('London');
    expect(wrapper.find('.location').text()).to.contain('London');
    done();
  });
});

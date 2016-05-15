import React from 'react';
import Store from '../stores/Store';

function getState() {
  return Store.getAll();
}

/**
 * Function that returns a higher order component which allows other
 * components to connect to the stores
 * @function
 * @author Kushal D'Souza
 * @param {ReactComponent} InnerComponent - component which is wrapped
 * @param {function} stateCallback - callback that is called on the change of state
 */
const connectToStores = (InnerComponent) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = getState();
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState(getState());
  }
  render() {
    return <InnerComponent {...this.state} {...this.props} />;
  }
};

export default connectToStores;

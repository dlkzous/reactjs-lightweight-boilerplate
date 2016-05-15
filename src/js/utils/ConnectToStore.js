import React from 'react';
import Store from '../stores/Store';

/**
 * Function that returns a higher order component which allows other
 * components to connect to the stores
 * @function
 * @author Kushal D'Souza
 * @param {ReactComponent} InnerComponent - component which is wrapped
 * @param {function} stateCallback - callback that is called on the change of state
 */
const connectToStores = (InnerComponent, stateCallback) => class extends React.Component {
  constructor(props) {
    super(props);
    this.state = stateCallback();
    this.onChange = this.onChange.bind(this);
  }
  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState(stateCallback());
  }
  render() {
    return <InnerComponent {...this.state} {...this.props} />;
  }
};

export default connectToStores;

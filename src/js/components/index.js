import React from 'react';
import connectToStore from '../utils/ConnectToStore';
import ActionCreator from '../actions/ActionCreator';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.onItemChange = this.onItemChange.bind(this);
    this.onItemsChanged = this.onItemsChanged.bind(this);
  }
  onItemChange(e) {
    this.setState({
      value: e.target.value
    });
  }
  onItemsChanged() {
    const { value } = this.state;
    ActionCreator.addItem(value);
    this.setState({
      value: ''
    });
  }
  render() {
    const { items } = this.props;
    const { value } = this.state;
    return (
      <div>
        {items[items.length - 1]}
        <input type="text" value={value} onChange={this.onItemChange} />
        <input type="button" onClick={this.onItemsChanged} value="submit" />
      </div>
    );
  }
}

Main.propTypes = {
  items: React.PropTypes.array.isRequired
};

export default connectToStore(Main);

import React from 'react';
import connectToStore from '../utils/ConnectToStore';
import DataService from '../services/DataService';
import Store from '../stores/Store';

function getState() {
  const data = Store.getAll();
  return { data };
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    DataService.getData();
  }
  render() {
    const { items, loadingCompleted } = this.props.data;
    return (
      <div>
        {loadingCompleted ?
          (
          <div className="row">
            <ul>
              {items.map((item, index) => <li key={index}>{item.city}</li>)}
            </ul>
          </div>
          )
        : (
          <div className="row">
            <div className="preloader-wrapper active">
              <div className="spinner-layer spinner-red-only">
                <div className="circle-clipper left">
                  <div className="circle"></div>
                </div><div className="gap-patch">
                  <div className="circle"></div>
                </div><div className="circle-clipper right">
                  <div className="circle"></div>
                </div>
              </div>
            </div>
          </div>
          )}
        {loadingCompleted}
        <a onClick={this.onClick} className="btn-floating btn-large waves-effect waves-light red">
          <i className="material-icons">add</i>
        </a>
      </div>
    );
  }
}

Main.propTypes = {
  data: React.PropTypes.object.isRequired
};

export default connectToStore(Main, getState);

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [ReactJS Boilerplate](#reactjs-boilerplate)
- [Installation](#installation)
- [Documentation](#documentation)
  - [ActionCreator](#actioncreator)
    - [addItem](#additem)
    - [setLoadingStatus](#setloadingstatus)
    - [toggleItem](#toggleitem)
  - [Service](#service)
  - [Stores](#stores)
  - [Helpers/Utils](#helpersutils)
    - [ConnectToStore Helper](#connecttostore-helper)
    - [ConnectToStore Helper Tests](#connecttostore-helper-tests)
- [Other Information](#other-information)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

[![travis build](https://img.shields.io/travis/kushaldsouza/reactjs-lightweight-boilerplate.svg)](https://travis-ci.org/kushaldsouza/reactjs-lightweight-boilerplate)
[![version](https://img.shields.io/npm/v/reactjs-lightweight-boilerplate.svg)](https://www.npmjs.com/package/reactjs-lightweight-boilerplate)
[![downloads](https://img.shields.io/npm/dt/reactjs-lightweight-boilerplate.svg)](https://www.npmjs.com/package/reactjs-lightweight-boilerplate)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# ReactJS Boilerplate
This is a simple ReactJS boilerplate application that utilises the flux architecture. It has been set up with eslint and jsdoc and uses Materialise CSS. It is aimed at developers who are either new to react or developers who want a minimal boilerplate ReactJS bootstrap application set up. It is written fully in ES6. Webpack-dev-server has been set up on the project. This has been set up with eslint as a preloader. The project extends the airbnb eslint configuration.

# Installation

The recommended method of using this boilerplate is to clone it from github directly.In order to clone the boilerplate application, run:

```git clone git@github.com:kushaldsouza/reactjs-lightweight-boilerplate.git```

If you use bower, you can clone the boilerplate by running the following command:

```bower install reactjs-lightweight-boilerplate```

Run the following commands to get the project up and running:

```js
  npm install 
  npm start
```

Visit ```http://localhost:8080/``` after running the above commands to load the index page of the application

Run the following command to run the tests:
```js
  npm run test 
```

Run the following command to generate the documentation:
```js
  npm run doc
```
The documentation is generated in the docs folder.

Run the following command to run eslint on the code:
```js
  npm run lint
```
The eslint report is generated in the lint folder. 

# Documentation
## ActionCreator
A simple action creator has been provided with three actions. The actions and their corresponding tests are showing below
### addItem
```js
  // src/js/actions/ActionCreator.js
  // add item action
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_ITEM, item
    });
  }

  // test/actions/ActionCreator.test.js
  it('dispatches the add item event when an item is added', (done) => {
    Actions.addItem('New York');
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'ADD_ITEM',
      item: 'New York'
    });
    done();
  });
```

### setLoadingStatus
```js
  // src/js/actions/ActionCreator.js
  // setLoadingStatus action
  setLoadingStatus(status) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_LOADING_STATUS, status
    });
  }

  // test/actions/ActionCreator.test.js
  it('dispatches the loading status event when loading status has been changed', (done) => {
    Actions.setLoadingStatus(true);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'SET_LOADING_STATUS',
      status: true
    });
    done();
  });
```
### toggleItem
```js
  // src/js/actions/ActionCreator.js
  // toggleItem action
  toggleItem(id) {
    AppDispatcher.dispatch({
      actionType: Constants.TOGGLE_ITEM, id
    });
  }

  // test/actions/ActionCreator.test.js
  it('dispatches the toggle item event when a toggle item dispatch event is called', (done) => {
    Actions.toggleItem(0);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'TOGGLE_ITEM',
      id: 0
    });
    done();
  });
```

## Service
A simple service has been included that makes a call to fetch data from an external api. This service then populates the returned data into the store.

```js
  // src/js/services/DataService.js
  getData() {
    Actions.setLoadingStatus(false);
    axios.get(this.URLS.FETCH)
      .then((response) => {
        Actions.addItem(response.data);
      })
      .catch(() => {
        Actions.setLoadingStatus(true);
      });
  }

  // test/services/DataService.test.js
  it('should dispatch the item to the store on receiving data from the service', (done) => {
    // Mock axios
    const axiosMock = {
      get() {
        return new Promise((resolve) => {
          const response = {
            data: 'Test'
          };
          resolve(response);
        });
      }
    };
    DataService.__Rewire__('axios', axiosMock);
    DataService.getData();
    setTimeout(() => {
      sinon.assert.calledTwice(spy);
      expect(spy.firstCall.calledWith({
        actionType: 'SET_LOADING_STATUS',
        status: false
      })).to.be(true);
      expect(spy.secondCall.calledWith({
        actionType: 'ADD_ITEM',
        item: 'Test'
      })).to.be(true);
      done();
    }, 0);
  });
```

## Stores
The application consists of a single store and corresponding tests for the store

```js
  // src/js/stores/Store.js
  const AppStore = Object.assign(EventEmitter.prototype, {
    emitChange() {
      this.emit(CHANGE_EVENT);
    },

    addChangeListener(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    getAll() {
      return data;
    },

    dispatcherIndex: AppDispatcher.register((action) => {
      switch (action.actionType) {
        case Constants.ADD_ITEM:
          addItem(action.item);
          break;
        case Constants.TOGGLE_ITEM:
          toggleItem(action.id);
          break;
        case Constants.SET_LOADING_STATUS:
          setLoadingStatus(action.status);
          break;
        default:
          break;
      }
      AppStore.emitChange();
    })
  });

  //test/stores/Store.test.js
  describe('Store', () => {
    beforeEach(() => {
      const defaultState = {
        items: [],
        loadingCompleted: true
      };
      Store.__Rewire__('data', defaultState);
      Store.__Rewire__('id', 0);
    });

    it('should have a default loading status of true and must allow to set it', (done) => {
      const response = Store.getAll();
      expect(response.loadingCompleted).to.be(true);
      AppDispatcher.dispatch({
        actionType: 'SET_LOADING_STATUS',
        status: false
      });
      expect(response.loadingCompleted).to.be(false);
      done();
    });

    it('should add an item to the store and reset loading status', (done) => {
      const response = Store.getAll();
      AppDispatcher.dispatch({
        actionType: 'SET_LOADING_STATUS',
        status: false
      });
      expect(response.loadingCompleted).to.be(false);

      AppDispatcher.dispatch({
        actionType: 'ADD_ITEM',
        item: 'New York'
      });
      expect(response.items[0].city).to.equal('New York');
      expect(response.items[0].id).to.not.be(null);
      expect(response.items[0].completed).to.be(false);
      expect(response.loadingCompleted).to.be(true);
      done();
    });

    it('should set the completed status of an item', (done) => {
      const response = Store.getAll();
      AppDispatcher.dispatch({
        actionType: 'ADD_ITEM',
        item: 'New York'
      });
      expect(response.items[0].completed).to.be(false);
      AppDispatcher.dispatch({
        actionType: 'TOGGLE_ITEM',
        id: 1
      });
      expect(response.items[0].completed).to.be(true);
      done();
    });
  });
```

## Helpers/Utils
The application consists of a higher order component that allows us connect components to the store.

### ConnectToStore Helper
```js
  // src/js/utils/ConnectToStore.js
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
```

In order to connect a component to a store, we need to define a callback that returns the substate of the stores state. For example, if we have a component known as Person, and we want the component to receive the name of the person from the store, we would define a callback as is shown below:
```js
  const stateCallback = () => {
    const { name } = Store.getAll();
    return { name };
  };
```

We then connect the person component to the store as follows:
```js
  export default ConnectToStore(Person, stateCallback);
```

This would ensure that the onChange method on the person component is called whenever there is an update to the data on the store.

### ConnectToStore Helper Tests
```js
  // test/utils/ConnectToStore.test.js
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
```

# Other Information

After setting up and running the application, you can start editing the ```src/js/components/index.js``` file.
It consits of a single page, with a button that gets the names of cities via a call to a rest service. These cities are then displayed in a list. 
Webpack and webpack dev server has been set up on the project. The project has also been set up with Travis CI, semantic release and commitizen. A detailed tutorial on setting up your own
boilerplate application with semantic release, Travis CI and commitizen can be found at [egghead.io](https://egghead.io/series/how-to-write-an-open-source-javascript-library).
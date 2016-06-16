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

# Other Information

After setting up and running the application, you can start editing the ```src/js/components/index.js``` file.
It consits of a single page, with a button that gets the names of cities via a call to a rest service. These cities are then displayed in a list. 
Webpack and webpack dev server has been set up on the project. The project has also been set up with Travis CI, semantic release and commitizen. A detailed tutorial on setting up your own
boilerplate application with semantic release, Travis CI and commitizen can be found at [egghead.io](https://egghead.io/series/how-to-write-an-open-source-javascript-library).
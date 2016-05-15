[![travis build](https://img.shields.io/travis/kushaldsouza/reactjs-lightweight-boilerplate.svg)](https://travis-ci.org/kushaldsouza/reactjs-lightweight-boilerplate)
[![version](https://img.shields.io/npm/v/reactjs-lightweight-boilerplate.svg)](https://img.shields.io/npm/v/reactjs-lightweight-boilerplate.svg)
[![downloads](https://img.shields.io/npm/dt/reactjs-lightweight-boilerplate.svg)](https://img.shields.io/npm/dt/reactjs-lightweight-boilerplate.svg)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This is a simple ReactJS boilerplate application that utilises the flux architecture. It has been set up with jshint and jsdoc and uses Materialise CSS.

## Installation

In order to clone the boilerplate application, run:

```git clone git@github.com:kushaldsouza/reactjs-lightweight-boilerplate.git```

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


## Other Information

The project extends the airbnb eslint configuration. After setting up and running the application, you can start editing the ```src/js/components/index.js``` file.
It consits of a single page, with a button that gets the names of cities via a call to a rest service. These cities are then displayed in a list. 
Webpack and webpack dev server has been set up on the project. The project has also been set up with Travis CI, semantic release and commitizen. A detailed tutorial on setting up your own
boilerplate application with semantic release, Travis CI and commitizen can be found at [egghead.io](https://egghead.io/series/how-to-write-an-open-source-javascript-library).
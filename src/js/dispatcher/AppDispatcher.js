import { Dispatcher } from 'flux';

const flux = new Dispatcher();

/**
 * @namespace AppDispatcher
 */


/**
 * Function that registeres a callback
 * @function register
 * @author Kushal Lyndon D'Souza
 * @param {function} callback - callback to be registered
 * @memberOf AppDispatcher
 */
export function register(callback) {
  return flux.register(callback);
}

/**
 * Function that dispatches an action given an action type
 * @function dispatch
 * @author Kushal Lyndon D'Souza
 * @param {string} actionType - the type of action to be dispatched
 * @param {string} action - the action that is to be dispatched
 * @memberOf AppDispatcher
 */
export function dispatch(actionType, action) {
  flux.dispatch(actionType, action);
}

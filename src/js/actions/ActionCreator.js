import Constants from '../constants/Constants';
import AppDispatcher from '../dispatcher/AppDispatcher';

/**
 * @namespace ActionCreator
 */
const ActionCreator = {
  /**
   * Function that adds an item to the store
   * @function addItem
   * @author Kushal D'Souza
   * @param {string} item - item to be added to the store
   * @memberOf ActionCreator
   */
  addItem(item) {
    AppDispatcher.dispatch({
      actionType: Constants.ADD_ITEM, item
    });
  },

  /**
   * Function that toggles the status of an item
   * @function toggleItem
   * @author Kushal D'Souza
   * @param {string} id - id of item
   * @memberOf ActionCreator
   */
  toggleItem(id) {
    AppDispatcher.dispatch({
      actionType: Constants.TOGGLE_ITEM, id
    });
  },

  /**
   * Function that sets the loading status in the store
   * @function setLoadingStatus
   * @author Kushal D'Souza
   * @param {bool} status - status that indicates whether a request is currently processing
   * @memberOf ActionCreator
   */
  setLoadingStatus(status) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_LOADING_STATUS, status
    });
  }
};

export default ActionCreator;

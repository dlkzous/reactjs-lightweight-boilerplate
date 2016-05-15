import Constants from '../constants/Constants';
import { dispatch } from '../dispatcher/AppDispatcher';

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
    dispatch({
      actionType: Constants.ADD_ITEM, item
    });
  }
};

export default ActionCreator;

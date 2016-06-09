import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
const items = [];
const data = { items, loadingCompleted: true };

const addItem = (item) => {
  items.push(item);
  data.loadingCompleted = true;
};

const setLoadingStatus = (status) => {
  data.loadingCompleted = status;
};

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
      case Constants.SET_LOADING_STATUS:
        setLoadingStatus(action.status);
        break;
      default:
        break;
    }
    AppStore.emitChange();
  })
});

export default AppStore;

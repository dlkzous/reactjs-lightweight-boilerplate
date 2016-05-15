import { register } from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';
const items = ['test'];
const data = { items };

const addItem = (item) => {
  items.push(item);
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

  dispatcherIndex: register((action) => {
    switch (action.actionType) {
      case Constants.ADD_ITEM:
        addItem(action.item);
        break;
      default:
        break;
    }
    AppStore.emitChange();
  })
});

export default AppStore;

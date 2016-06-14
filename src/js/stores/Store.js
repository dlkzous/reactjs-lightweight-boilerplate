import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';
import { EventEmitter } from 'events';
import _ from 'lodash';

let id = 0;
const CHANGE_EVENT = 'change';
const data = {
  items: [],
  loadingCompleted: true
};

const addItem = (item) => {
  data.items.push({
    city: item,
    id: ++id,
    completed: false
  });
  data.loadingCompleted = true;
};

const toggleItem = (itemID) => {
  const index = _.indexOf(data.items, _.find(data.items, { id: itemID }));
  if (index >= 0) {
    data.items[index].completed = !data.items[index].completed;
  }
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

export default AppStore;

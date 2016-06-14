import AppDispatcher from '../../src/js/dispatcher/AppDispatcher';
import Store from '../../src/js/stores/Store';
import expect from 'expect.js';

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

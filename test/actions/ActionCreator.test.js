import Actions from '../../src/js/actions/ActionCreator';
import AppDispatcher from '../../src/js/dispatcher/AppDispatcher';
import sinon from 'sinon';

describe('ActionCreator', () => {
  let spy;

  beforeEach(() => {
    spy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    AppDispatcher.dispatch.restore();
  });

  it('dispatches the add item event when an item is added', (done) => {
    Actions.addItem('test');
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'ADD_ITEM',
      item: 'test'
    });
    done();
  });

  it('dispatches the loading status event when loading status has been changed', (done) => {
    Actions.setLoadingStatus(true);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'SET_LOADING_STATUS',
      status: true
    });
    done();
  });
});

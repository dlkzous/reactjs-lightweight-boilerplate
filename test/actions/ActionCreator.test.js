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
    Actions.addItem('New York');
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'ADD_ITEM',
      item: 'New York'
    });
    done();
  });

  it('dispatches the toggle item event when a toggle item dispatch event is called', (done) => {
    Actions.toggleItem(0);
    sinon.assert.calledOnce(spy);
    sinon.assert.calledWith(spy, {
      actionType: 'TOGGLE_ITEM',
      id: 0
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

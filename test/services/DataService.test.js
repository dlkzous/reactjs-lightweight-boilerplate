import AppDispatcher from '../../src/js/dispatcher/AppDispatcher';
import DataService from '../../src/js/services/DataService';
import sinon from 'sinon';
import expect from 'expect.js';

describe('DataService', () => {
  let spy;

  beforeEach(() => {
    spy = sinon.spy(AppDispatcher, 'dispatch');
  });

  afterEach(() => {
    AppDispatcher.dispatch.restore();
    DataService.__ResetDependency__('axios');
  });

  it('should dispatch the item to the store on receiving data from the service', (done) => {
    // Mock axios
    const axiosMock = {
      get() {
        return new Promise((resolve) => {
          const response = {
            data: 'Test'
          };
          resolve(response);
        });
      }
    };
    DataService.__Rewire__('axios', axiosMock);
    DataService.getData();
    setTimeout(() => {
      sinon.assert.calledTwice(spy);
      expect(spy.firstCall.calledWith({
        actionType: 'SET_LOADING_STATUS',
        status: false
      })).to.be(true);
      expect(spy.secondCall.calledWith({
        actionType: 'ADD_ITEM',
        item: 'Test'
      })).to.be(true);
      done();
    }, 0);
  });

  it('should reset the loading status on failed service request', (done) => {
    // Mock axios
    const axiosMock = {
      get() {
        return new Promise((resolve, reject) => {
          reject();
        });
      }
    };
    DataService.__Rewire__('axios', axiosMock);
    DataService.getData();
    setTimeout(() => {
      sinon.assert.calledTwice(spy);
      expect(spy.firstCall.calledWith({
        actionType: 'SET_LOADING_STATUS',
        status: false
      })).to.be(true);
      expect(spy.secondCall.calledWith({
        actionType: 'SET_LOADING_STATUS',
        status: true
      })).to.be(true);
      done();
    }, 0);
  });
});

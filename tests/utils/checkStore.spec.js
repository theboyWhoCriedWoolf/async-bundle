import checkstore from '../../src/utils/checkStore';

describe('utils/checkstore', () => {
    const mockStore = {
        dispatch: Function,
        subscribe: Function,
        getState: Function,
        replaceReducer: Function,
        asyncReducers: {},
    };

    test('expected store to pass', () => {
        expect(() => {
            checkstore(mockStore);
        });
    });

    test('expected to throw errror when `store.hasSagas` is wrong type', () => {
        mockStore.runSaga = {};
        expect(() => {
            checkstore(mockStore);
        }).toThrow();
    });

    test('expected to throw errror if `asyncSagas` is not a Object', () => {
        mockStore.asyncSagas = () => {};
        expect(() => {
            checkstore(mockStore);
        }).toThrow();
    });
});

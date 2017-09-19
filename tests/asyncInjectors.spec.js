import { combineReducers } from 'redux';
import configureStore from 'redux-mock-store';
import { createReducer } from 'redux-create-reducer';
import { omit } from 'ramda';

import { injectAsyncReducer, injectAsyncSagas } from '../src/asyncInjectors';

const mockCreateReducer = asyncReducer => (
    combineReducers({
        ...asyncReducer
    })
);

describe('test injectAsyncReducers', () => {
    const mockStore = omit(['getActions', 'clearActions'], { ...configureStore([])(), asyncReducers: {} });
    const mockAsyncReducerInjector = injectAsyncReducer(mockStore, mockCreateReducer);

    test('thows an error without `createReducer`', () => {
        expect(() => {
            mockAsyncReducerInjector({}, null);
        }).toThrow();
    });

    test('thows an error without `name`', () => {
        expect(() => {
            mockAsyncReducerInjector(null, createReducer({}, {}));
        }).toThrow();
    });

    test('thows an error without `asyncReducer`', () => {
        expect(() => {
            mockAsyncReducerInjector('mockRoute', null);
        }).toThrow();
    });

    test('injectAsyncReducer adds new reducers to store', () => {
        const asyncReducer = createReducer({}, { MOCK: state => (state) });
        mockAsyncReducerInjector('mockRoute', asyncReducer);
        expect(mockStore.asyncReducers).toHaveProperty('mockRoute');
    });
});

describe('test injectAsyncSagas', () => {
    const mockStore = { ...configureStore([])(), asyncReducers: {}, runSaga: () => {} };
    const mockAsyncSagas = injectAsyncSagas(mockStore);

    test('expected an error without `name`', () => {
        expect(() => {
            mockAsyncSagas(null, [jest.fn()]);
        }).toThrow();
    });

    test('expected an error without `sagas`', () => {
        expect(() => {
            mockAsyncSagas('mockName', null);
        }).toThrow();
    });

    test('expected an error without `runSaga`', () => {
        mockStore.runSaga = undefined;
        expect(() => {
            mockAsyncSagas('mockName', [jest.fn()]);
        }).toThrow();
    });
});

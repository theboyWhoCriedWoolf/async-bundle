import invariant from 'invariant';
import warning from 'warning';
import { is, isEmpty, isNil } from 'ramda';

/* eslint no-param-reassign: 0 */
import { checkStore, getSagas } from './utils';

/**
 * Injects asynchronously loaded reducer/s
 */
export function injectAsyncReducer(store, createReducer, isValid) {
    return function injectReducer(name, asyncReducer) {
        if (!isValid) checkStore(store);

        invariant(
            is(String, name)
            && !isEmpty(name)
            && is(Object, asyncReducer)
            && is(Function, createReducer),
            '(AsyncBundle/injectAsyncReducer): Expected `asyncReducer` to be a reducer function'
        );

        if (Reflect.has(store.asyncReducers, name)) return;

        store.asyncReducers[name] = asyncReducer;
        store.replaceReducer(createReducer(store.asyncReducers));
    };
}

/**
 * Injects asynchronously loaded sagas
 */
export function injectAsyncSagas(store, getAsyncSagas, isValid) {
    return function injectSagas(name, sagas) {
        if (!isValid) checkStore(store);

        invariant(
            is(String, name)
            && !isEmpty(name)
            && is(Array, sagas)
            && is(Function, store.runSaga),
            '(AsyncBundle/injectAsyncSagas): Expected `sagas` to be an array of generator functions'
        );

        warning(
            !isEmpty(sagas),
            '(AsyncBundle/injectAsyncSagas): Received an empty `sagas` array'
        );

        if (store.asyncSagas && Reflect.has(store.asyncSagas, name)) return;
        getAsyncSagas(name, sagas).map(store.runSaga);
    };
}

/**
 * Returns helper methods
 */
export default function getAsyncInjectors(store, createReducer) {
    if (!isNil(store)) { checkStore(store); }
    return {
        injectAsyncReducer: injectAsyncReducer(store, createReducer, true),
        injectAsyncSagas: injectAsyncSagas(store, getSagas(store), true)
    };
}

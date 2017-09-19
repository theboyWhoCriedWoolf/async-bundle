import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import createReducer from './reducer';

export default function configureStore(history) {
    const routeMiddleware = routerMiddleware(history);
    const sagaMiddleware = createSagaMiddleware();

    /* create store */
    const store = createStore(
        createReducer(), applyMiddleware(sagaMiddleware, routeMiddleware, logger)
    );

    /* Extensions */

    /**
     * Runs saga generators
     * @type {[type]}
     */
    store.runSaga = sagaMiddleware.run;

    /**
     * Prevents saga duplication
     */
    // store.asyncSagas = {};

    /**
     * stores reducers
     */
    // store.asyncReducers = {}; // Async reducer registry

    return store;
}

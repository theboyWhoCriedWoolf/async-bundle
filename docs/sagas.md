# Splitting Sagas

Splitting Sagas is based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) and is implemented in a similar way to [splitting reducers](redux.md).

Loading Sagas asynchronously is done by passing Saga generators into Saga's run method at runtime for each route. For more information on redux-saga, please see their [documentation](https://redux-saga.js.org/).

AsyncBundle expects you to have provided sagas.run to your store which it then uses to map your reducers to once they have loaded.

You generally must also provide `createReducer` as you will need to handle actions dispatched from redux-saga.

### Setting up your Sagas

#### index
```js
// index.js
import { AsyncRoute } from '../src/index';
import { Route } from 'react-router-dom';

import createReducer from './reducer';

const store = createStore(history);
const Bundle = AsyncBundle(store, createReducer);

/**
 * Provide saga as the third parameter in the Array or alternatively
 * pass in paremeters using an Object
 */
<Route exact path="/" render={() => <Bundle name="about" load={[ import('./containers/About'), null, import('./sagas/AboutSagas') ]} />} />

```

#### createStore
However you define your store and setup sagas, you must pass `sagas.run` to `store.runSaga` to make it available in AsyncBundle.

```js
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

    /*
     * Extensions (must be specified)
     * Any root sagas can be added here also
     */
    store.runSaga = sagaMiddleware.run;

    return store;
}
```

#### ExampleSaga.js
Note that the example uses [react-router-redux](https://github.com/reactjs/react-router-redux) in order to suspend/cancel the saga generator in between routes.

> Warning: It is important that you suspend your generators when switching routes otherwise you will end up duplicating generators when switching between routes.

```js
import { call, put, takeLatest, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { CIRCLES_DATA_REQUEST, CIRCLES_DATA_SUCCESS, CIRCLES_DATA_ERROR } from './constants';
import apiFetch from '../../api';

function* fetchHomepageData() {
    try {
        const shapes = yield call(apiFetch, '/api/shapes');
        yield put({ type: CIRCLES_DATA_SUCCESS, payload: { shapes } });
    } catch (e) {
        yield put({ type: CIRCLES_DATA_ERROR, message: e });
    }
}

function* mySaga() {
    const watcher = yield takeLatest(CIRCLES_DATA_REQUEST, fetchHomepageData);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    mySaga
];
```

### Preventing generator duplication
If you are looking to use Sagas but not [react-router-redux](https://github.com/reactjs/react-router-redux), you can avoid duplication by adding `store.asyncSagas` to your store. By doing this, AsyncBundle will store your generators using the name prop provided and will make sure its only added once.

```js
/*
 * Creates an object to store your generators
 */
store.asyncSagas = {};

// Creating your route like so:
const routeProps = {
    comp: import('./containers/About'),
    reducer: import('./reducers/AboutReducer'),
    sagas: import('./sagas/AboutSagas')
}
<Route exact path="/" render={() => <Bundle name="about" load={routeProps} />

// Will append your generators to asyncSagas.
// This will only be added once when switching between routes
// and prevent duplication
store.asyncSagas['about'] = yourLoadedSagaGenerators;

```

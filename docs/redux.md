# Splitting Reducers
Based on [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate), `async-bundle` allows you to inject imported async reducers at runtime providing route based state data.

### Setting up your async reducers
 - [Index page](#index)
 - [Reducer](#reducer)
 - [Defining your store](#createStore)
 - [CreateReducer](#createReducer)

`async-bundle` injects reducers per route using redux's `store.replaceReducer`. Once a reducer is loaded, `async-bundle` injects the new reducer into the store using your  `createReducer` method keeping any global reducers. The name provided to each Bundle will provide the key in which to access your route specific data in the state.

<a name="index"></a>
#### Index

To enable this functionality and split your redux state you must provide the following when defining your `async-bundle`:
 - Name
 - Redux store
 - Create reducer function

```js
// index.js
import { AsyncBundle } from 'async-bundle';
import { Route } from 'react-router-dom';

const store = createStore(history);
// createReducer returns root reducers with async reducers
const Bundle = AsyncBundle(store, createReducer);

// load={[component, reducer, sagas]}
<Route exact path="/" render={() => <Bundle name="about" load={[ import('./containers/About'), import('./reducers/AboutReducer')]} />} />
```

<a name="reducer"></a>
#### Reducer

```js
//AboutReducer.js
import { createReducer } from 'redux-create-reducer';

export default createReducer({}, {
    [YOUR_ACTION_CONST]: state => ({
        ...state,
        exampleValue: true
    }),
});
```

<a name="createStore"></a>
#### CreateStore
The createStore method simple creates your redux store. Please see redux documentation for further details.

To give you more control over your async reducers, you should create a global object within your redux store called asyncReducers. However if you do not this is automatically done within `async-bundle`.


```js
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';

import createReducer from './reducer';

export default function configureStore(history) {
    const routeMiddleware = routerMiddleware(history);

    /* create store */
    const store = createStore(
        createReducer(), applyMiddleware(routeMiddleware, logger)
    );

    /* Extensions */
    store.asyncReducers = {}; // Async reducer registry

    return store;
}
```

<a name="createReducer"></a>
#### CreateReducer

CreateReducer must be supplied when instantiating `async-bundle` in order to make sure root reducers are correctly handled when replacing reducers for each route.

```js
import { combineReducers } from 'redux';
import { createReducer } from 'redux-create-reducer';

import { SHOW_INITIAL_GREETING } from './constants';

// create or pass in all your root reducers (global reducers)
const rootReducer = createReducer({ greeting: '' }, {
    [SHOW_INITIAL_GREETING]: state => ({
        ...state,
        greeting: 'Welcome'
    })
});

export default function getReducer(asyncReducer) {
    return combineReducers({
        // pass in as many root reducers you need
        rootReducer,
        // this allows reducers to be added dynamically per route
        ...asyncReducer
    });
}
```

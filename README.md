# async-bundle

[![npm version](https://img.shields.io/npm/v/async-bundle.svg)](https://www.npmjs.com/package/async-bundle)
[![npm](https://img.shields.io/npm/dm/async-bundle.svg)](https://www.npmjs.com/package/async-bundle)

Code splitting for React, Redux and Redux-Saga.
Based on [React Router 4](https://reacttraining.com/react-router/web/guides/code-splitting) and [React Boilerplate](https://reacttraining.com/react-router/web/guides/code-splitting).

**AsyncBundle** helps you scale your application and improve load time by providing an easy way to split your code into various bundles, which can then be loaded in on demand. Giving you complete flexibility in the way that you load in your async modules. Not just with regards to the import tools you can use, but also how you structure your code within your application.

## Features

**Code Splitting** -
Easily split your application into dynamically loaded chunks, using either [ES6 Imports](https://github.com/airbnb/babel-plugin-dynamic-import-node) or [Webpack's Bundle Loader](https://github.com/webpack-contrib/bundle-loader)

**Inject asynchronously loaded reducers** -
Split your store's state into easily maintainable chunks, loading only what you need for each route.

**Inject asynchronously loaded redux-sagas** -
Dynamically load your saga's as and when you need them

## Getting started

<a name="install"></a>
### Install

```sh
$ npm install async-bundle --save
```
or

```sh
$ yarn add async-bundle
```
<a name="async-bundle"></a>
## Parameters
`async-bundle` *load* prop accepts:
 - **comp** - view component import using specified async imports
 - **reducer** - redux reducer
 - **sagas** - array of generators

#### Array:

```js
/**
 * load property as array (order must be as specified)
 */
<Bundle load={[
    yourImportedComponent,
    reducer,
    sagas
]}
```
#### Object:

```js
/**
 * load property as array (order must be as specified)
 */
<Bundle load={{
    comp,
    reducer,
    sagas
}}
```

<a name="quickStart"></a>
## Usage Example

`async-bundle` provides several ways to split up your code and asynchronously load in your modules. The easiest way is by passing your imports to the load prop of the bundle.

Once the Bundle resolves your imported component it updates the state internally and renders the component.

You can use either the [component](https://reacttraining.com/react-router/web/api/Route/component) or [render](https://reacttraining.com/react-router/web/api/Route/render-func) props of React's Route component. Please refer to the [React Router docs](https://reacttraining.com/react-router/web/api/Route/component) for further information.

```js
import React from 'react';
import Home from 'bundle-loader?lazy!./Home';
import { AsyncRoute, AsyncBundle } from 'async-bundle';
import { Route } from 'react-router-dom';

// Initialise your Bundle
const Bundle = AsyncBundle();
// Initialise your Bundle using AsyncRoute, a HOC for AsyncBundle
const RouteBundle = AsyncRoute();

class App extends React.Component {
    // Component code
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
                // load component using bundle-loader
                <Route path="/" component={() => <Bundle load={[Home]} />} />
                // load component using babel-import
                <Route path="/dashboard" component={() => <Bundle load={[import('./Dashboard')]} />} />
                // load component using bundle-loader
                // pass in RouteBundle directly without having to define a function
                <Route path="/about" component={RouteBundle({comp: import('./Dashboard')})} />
            </div>
        )
    }
}
```

## Documentation
- [AsyncBundle](https://github.com/theboyWhoCriedWoolf/async-bundle/blob/master/docs/asyncBundle.md)
- [AsyncRoute](https://github.com/theboyWhoCriedWoolf/async-bundle/blob/master/docs/asyncRoute.md)
- [Splitting Reducers](https://github.com/theboyWhoCriedWoolf/async-bundle/blob/master/docs/redux.md)
- [Splitting Sagas](https://github.com/theboyWhoCriedWoolf/async-bundle/blob/master/docs/sagas.md)
- [Optimisations with babel](https://github.com/theboyWhoCriedWoolf/async-bundle/blob/master/docs/optimise.md)


## Issues

If you find a bug, please file an issue on [the issue tracker on GitHub](https://github.com/theboyWhoCriedWoolf/async-bundle/issues).

## Contribution
Please feel free to contribute or provide improvements.

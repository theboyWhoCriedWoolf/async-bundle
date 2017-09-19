/* eslint import/no-unresolved:0 import/no-webpack-loader-syntax:0  */

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import loadSomething from 'bundle-loader?lazy!./containers/About';

import {
    Switch,
    Route,
    NavLink
} from 'react-router-dom';

import createStore from './store';
import { AsyncRoute, AsyncBundle } from '../src/index';
import createReducer from './reducer';

import Circles from './containers/Circles';
import Squares from './containers/Squares';
import './index.css';

const history = createHistory();
const store = createStore(history);

const MOUNT_NODE = document.getElementById('react-root');

function render() {
    const Bundle = AsyncBundle(store, createReducer);
    const RouteBundle = AsyncRoute(store, createReducer);

    /* testing using React Router 4 implementation */
    const About = props => (
        <Bundle load={[loadSomething]}>
            {AboutView => <AboutView littleMessage="Hello World, This Route only loads an async component" {...props} />}
        </Bundle>
    );

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <div className="root">
                    <nav>
                        <NavLink exact to="/">Circles</NavLink>
                        <NavLink exact to="/squares">Squares</NavLink>
                        <NavLink exact to="/about">About</NavLink>
                    </nav>
                    <Switch>
                        {/* Set up route component using either render/component */}
                        <Route exact path="/" render={() => <Bundle name="circles" load={Circles} />} />
                        {/* Set up route component using AsyncRoute */}
                        <Route exact path="/squares" component={RouteBundle({ name: 'squares', ...Squares })} />
                        {/* Set up route component using React Router 4 Example */}
                        <Route exact path="/about" component={About} />
                    </Switch>
                </div>
            </ConnectedRouter>
        </Provider>, MOUNT_NODE);
}

render();

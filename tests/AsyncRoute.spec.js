import React from 'react';
import { omit } from 'ramda';
import { combineReducers } from 'redux';
import configureStore from 'redux-mock-store';

import AsyncRoute from '../src/AsyncRoute';

const mockStore = omit(['getActions', 'clearActions'], configureStore([])());

const mockCreateReducer = asyncReducer => (
    combineReducers({
        ...asyncReducer
    })
);

describe('test asyncBundle Component', () => {
    const RouteBundle = AsyncRoute(mockStore, mockCreateReducer);

    test('expected mod to error without comp', () => {
        expect(() => {
            RouteBundle({})({});
        }).toThrow();
    });

    test('expected comp to be supplied', () => {
        const Bundle = RouteBundle({ comp: (<div>Hello World</div>) })({});
        expect(
            Bundle.props.load.comp.props.children
        ).toBe('Hello World');
    });

    test('expected reducer to be a function', () => {
        const reducer = jest.fn();
        const Bundle = RouteBundle({ comp: (<div>Hello World</div>), reducer })({});
        expect(
            Bundle.props.load.reducer
        ).toEqual(reducer);
    });

    test('expected sagas to be an array', () => {
        const sagas = jest.fn();
        const Bundle = RouteBundle({ comp: (<div>Hello World</div>), sagas })({});
        expect(
            Bundle.props.load.sagas
        ).toEqual(sagas);
    });
});

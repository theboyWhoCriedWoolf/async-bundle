import React from 'react';
import { omit } from 'ramda';
import { shallow } from 'enzyme';
import { combineReducers } from 'redux';
import configureStore from 'redux-mock-store';

import BundleLoader from '../src/AsyncBundle';

const mockStore = omit(['getActions', 'clearActions'], configureStore([])());

const mockCreateReducer = asyncReducer => (
    combineReducers({
        ...asyncReducer
    })
);

describe('test asyncBundle Component', () => {
    const AsyncBundle = BundleLoader(mockStore, mockCreateReducer);

    test('expected mod to render null without error', () => {
        const wrapper = shallow(<AsyncBundle load={{ comp: import('./MockComponent') }} />);
        wrapper.setState({ mod: null });
        expect(wrapper.text()).toEqual('');
    });

    test('expected mod to render from state', () => {
        const wrapper = shallow(<AsyncBundle load={{ comp: import('./MockComponent') }} />);
        wrapper.setState({ mod: (<div>Hello World</div>) });
        expect(wrapper.text()).toEqual('Hello World');
    });
});

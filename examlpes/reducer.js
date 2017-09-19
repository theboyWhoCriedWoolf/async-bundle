import { combineReducers } from 'redux';
import { createReducer } from 'redux-create-reducer';

import { SHOW_INITIAL_GREETING } from './constants';

const rootReducer = createReducer({ greeting: '' }, {
    [SHOW_INITIAL_GREETING]: state => ({
        ...state,
        greeting: 'Welcome'
    })
});

export default function getReducer(asyncReducer) {
    return combineReducers({
        rootReducer,
        ...asyncReducer
    });
}

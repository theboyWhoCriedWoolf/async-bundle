import { createReducer } from 'redux-create-reducer';

import { SQUARES_DATA_REQUEST, SQUARES_DATA_SUCCESS } from './constants';

export default createReducer({ title: 'About Page', shapes: [] }, {
    [SQUARES_DATA_REQUEST]: state => ({
        ...state,
        title: 'Loading shapes....'
    }),

    [SQUARES_DATA_SUCCESS]: (state, { payload } = {}) => ({
        ...state,
        title: 'Look, fun square shapes!',
        shapes: payload.shapes
    })
});

export const squaresState = state => (state.squares);

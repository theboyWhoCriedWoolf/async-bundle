import { createReducer } from 'redux-create-reducer';

import { CIRCLES_DATA_REQUEST, CIRCLES_DATA_SUCCESS } from './constants';

export default createReducer({ title: 'Circles', shapes: [] }, {
    [CIRCLES_DATA_REQUEST]: state => ({
        ...state,
        title: 'Loading shapes....'
    }),

    [CIRCLES_DATA_SUCCESS]: (state, { payload } = {}) => ({
        ...state,
        title: 'Look, fun circular shapes!',
        shapes: payload.shapes
    })
});

export const getCirclesState = state => (state.circles);

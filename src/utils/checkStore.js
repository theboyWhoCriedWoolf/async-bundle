import { isNil, is } from 'ramda';
import invariant from 'invariant';

import isType from './isType';
import conformsTo from './conformsTo';

/**
 * Checks Redux store validity
 */
export default function checkStore(store) {
    store.asyncReducers = store.asyncReducers || {}; // eslint-disable-line no-param-reassign

    const shape = {
        dispatch: isType('Function'),
        subscribe: isType('Function'),
        getState: isType('Function'),
        replaceReducer: isType('Function'),
        asyncReducers: isType('Object'),
        asyncSagas: store.asyncSagas ? isType('Object') : isNil,
        /* add sagas related values if available */
        ...(is(Function, store.runSaga) ? { runSaga: isType('Function') } : {})
    };

    invariant(
        conformsTo(shape)(store),
        '(AsyncBundle/checkStore): Expected a valid Redux store'
    );
}

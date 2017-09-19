import React from 'react';
import invariant from 'invariant';
import { curry, isNil } from 'ramda';

import AsyncBundle from './AsyncBundle';

export default function AsyncRoute(store, createReducer) {
    const Bundle = AsyncBundle(store, createReducer);
    return curry(({ comp, reducer, sagas, name }, props) => {
        invariant(
            !isNil(comp),
            '(AsyncRoute): Expected a component `comp` to be supplied'
        );
        return (<Bundle {...props} load={{ comp, reducer, sagas }} name={name} />);
    });
}

import { keys, flip, allPass, isEmpty, where, pipe, difference } from 'ramda';

/**
 * Takes in an object and applies each predicate with the
 * values of the corresponding keys from the comparison object
 */
const conformsTo = spec => allPass([
    pipe(keys, flip(difference)(keys(spec)), isEmpty),
    where(spec)
]);

export default conformsTo;

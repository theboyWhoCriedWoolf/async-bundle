import { type } from 'ramda';

/**
 * compares type
 * @param  {string} type predicate
 * @return {Boolean}
 */
const isType = typeName => x => typeName === type(x);
export default isType;

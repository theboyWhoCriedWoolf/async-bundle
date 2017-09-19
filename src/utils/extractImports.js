import { compose, props, is, map, unless, when } from 'ramda';

/**
 * Extracts imports from:
 * bundle-loader (https://github.com/webpack-contrib/bundle-loader)
 * babel-plugin-dynamic-import-node (https://github.com/airbnb/babel-plugin-dynamic-import-node)
 */
const importsFromFn = module => (
    Reflect.ownKeys(module).includes('arguments') ? new Promise(module) : module()
);

/* returns array of imports from object */
const fromObject = props(['comp', 'reducer', 'sagas']);
/* Loops imports to extract either a Module || Promise */
const getImports = map(when(is(Function), importsFromFn));
/* extracts imports out of parameters */
const getModules = unless(is(Array), fromObject);

/**
 * Extracts all async modules
 * @return {array}
 */
export default compose(getImports, getModules);

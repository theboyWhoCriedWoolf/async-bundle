# AsyncBundle

`AsyncBundle` takes a prop called * load * that defines its async modules. Once the component mounts or a new load prop is defined, it calls load, loading each import placing the value in state. Finally, it calls back in render with the module or renders the module directly.

## Options
The *load* prop accepts either an array or an object.

- `load={[ comp, reducer, sagas ]}`
- `load={{ comp, reducer, sagas }}`

### Loading components
Probably the easiest way to load in your async components is by passing your import directly to the *load* prop of `AsyncBundle`, either using an array or an object.

Please refer to [Splitting Reducers](redux.md) and [Splitting Sagas](sagas.md) for more information about providing extra parameters into your `AsyncBundle`.

- [Using an Array](#usingArray)
- [Using an Object](#usingObject)
- [Supported import tools](#importTools)

<a name="usingArray"></a>
#### Load options {Array}:


```js
import { AsyncBundle } from 'async-bundle';
// Instantiate the bundle
const Bundle = AsyncBundle();
// Create a Route component
const About = (
    <Bundle load={[ import('./components/About') ]} />
)
```
<a name="usingObject"></a>
#### Load options {Object}:
```js
import { AsyncBundle } from 'async-bundle';
// Instantiate the bundle
const Bundle = AsyncBundle();
// Create a Route component
const About = (
    <Bundle load={{ comp: import('./components/About') }} />
)
```
<a name="importTools"></a>
### Import tools
The Bundles *load* prop can accept either a function returning a [node-import](https://github.com/airbnb/babel-plugin-dynamic-import-node), node-import itself or using [bundle-loader](https://github.com/webpack-contrib/bundle-loader).
```js
import { AsyncBundle } from 'async-bundle';
import loadSomething from 'bundle-loader?lazy!./containers/Something';

// Instantiate the bundle
const Bundle = AsyncBundle();
// Create a Route component
const About = (
    // using a function
    <Bundle load={{ comp: () => import('./components/About') }} />
    // using import
    <Bundle load={{ comp: import('./components/About') }} />
    // using bundle-loader
    <Bundle load={{ comp: loadSomething }} />
)
```

### Child Components
Once your module has loaded it will either render directly or be passed into a child function if one is defined. Please see [React Router 4](https://reacttraining.com/react-router/web/guides/code-splitting) documentation to see how this happens.

This allows you to define your Bundle as:
```js

/* using React Router 4 implementation */
const About = props => (
    <Bundle load={[loadSomething]}>
        // returns component as child
        {(AboutView) => <AboutView {...props} />}
    </Bundle>
);
```

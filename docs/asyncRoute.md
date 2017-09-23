# Using AsyncRoute

`AsyncRoute` is a HOC *(Higher Order Component)* that was born out of pure laziness. It enables you to pass your Bundle directly into the *component/render* prop of React Router.


Instead of passing in a function as you would with `AsyncBundle`:
```js
import { AsyncBundle } from 'async-bundle';

const Bundle = AsyncBundle();
// Pass in Bundle to component prop
<Route exact path="/about" component={ () => <Bundle load={[ import('./components/About') ]}} /> } />
```

With AsyncRoute you can pass in the component and props directly:
```js
import { AsyncRoute } from 'async-bundle';

// Pass in Bundle to component prop
const Bundle = AsyncRoute();
<Route exact path="/about" component={Bundle({ comp: import('./components/About') })} />
```

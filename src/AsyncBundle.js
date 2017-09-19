import React, { PureComponent } from 'react';
import { string, shape, oneOfType, node, arrayOf, func, array } from 'prop-types';
import { equals } from 'ramda';

import getAsyncInjectors from './asyncInjectors';
import { extractImports, validImport } from './utils';

const loadShape = shape({
    comp: oneOfType([shape({}), func]).isRequired,
    reducer: oneOfType([shape({}), func]),
    sagas: oneOfType([shape({}), func])
});

export default function AsyncBundleComp(store, createReducer) {
    /* get async reducer and saga injectors */
    const { injectAsyncReducer, injectAsyncSagas } = getAsyncInjectors(store, createReducer);
    return class AsyncBundle extends PureComponent {
        static propTypes = {
            load: oneOfType([array, arrayOf(loadShape), loadShape]).isRequired,
            name: string,
            children: oneOfType([arrayOf(node), node, func]),
        };

        state = { mod: null };

        componentWillMount() {
            this.load(this.props);
        }

        componentWillReceiveProps(nextProps) {
            if (!equals(nextProps.load, this.props.load)) {
                this.load(nextProps);
            }
        }

        elFromMod = (mod) => {
            /* return available render method */
            const Mod = validImport(mod);
            const { children, load, ...rest } = this.props;
            return (children ? children(Mod) : <Mod {...rest} />);
        }

        load = (props) => {
            const { name, load = {} } = props;
            this.setState({ mod: null });

            /* Load all imports as Promises */
            const importModules = Promise.all([...extractImports(load)]);

            importModules.then(([mod, reducer, sagas]) => {
                /* Inject reducer and sagas if they are available */
                if (reducer) injectAsyncReducer(name, validImport(reducer));
                if (sagas) injectAsyncSagas(name, validImport(sagas));

                this.setState({ mod: this.elFromMod(mod) });
            });
        }

        render() {
            return this.state.mod ? this.state.mod : null;
        }
    };
}

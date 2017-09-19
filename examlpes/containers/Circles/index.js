
export default {
    comp: import('./connector'),
    reducer: () => import('./reducer'),
    sagas: () => import('./sagas')
};

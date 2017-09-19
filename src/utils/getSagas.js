

export default store => (name, sagas) => {
    if (store.asyncSagas) {
        store.asyncSagas[name] = sagas; // eslint-disable-line no-param-reassign
    }
    return sagas;
};

import { call, put, takeLatest, take, cancel } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import { CIRCLES_DATA_REQUEST, CIRCLES_DATA_SUCCESS, CIRCLES_DATA_ERROR } from './constants';
import apiFetch from '../../api';

function* fetchHomepageData() {
    try {
        const shapes = yield call(apiFetch, '/api/shapes');
        yield put({ type: CIRCLES_DATA_SUCCESS, payload: { shapes } });
    } catch (e) {
        yield put({ type: CIRCLES_DATA_ERROR, message: e });
    }
}

function* mySaga() {
    const watcher = yield takeLatest(CIRCLES_DATA_REQUEST, fetchHomepageData);
    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    mySaga
];

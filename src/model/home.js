import { call, put, takeEvery, take } from 'redux-saga/effects'
import * as services from '../services/home'

function* test({ payload }) {
    const result = yield call(services.test, payload)
    yield put({
        type: 'success',
        payload: {
            test: result
        }
    })
}

function* homeSaga() {
    yield takeEvery('test', test)
}

export default homeSaga
import { call, put, takeEvery, take } from 'redux-saga/effects'
import * as services from '../services/home'

function* getImgs({ payload }) {
    const result = yield call(services.getImgs, payload)
    yield put({
        type: 'success',
        payload: {
            getImgs: result
        }
    })
}

function* getNotice({ payload }) {
    const result = yield call(services.getNotice, payload)
    yield put({
        type: 'success',
        payload: {
            getNotice: result
        }
    })
}

function* getMoveable({ payload }) {
    const result = yield call(services.getMoveable, payload)
    yield put({
        type: 'success',
        payload: {
            getMoveable: result
        }
    })
}

function* getUnmoveable({payload}){
    const result = yield call(services.getUnmoveable,payload)
    yield put({
        type:'success',
        payload:{
            getUnmoveable:result
        }
    })
}

function* homeSaga() {
    yield takeEvery('getImgs', getImgs)
    yield takeEvery('getNotice', getNotice)
    yield takeEvery('getMoveable', getMoveable)
    yield takeEvery('getUnmoveable',getUnmoveable)
}

export default homeSaga
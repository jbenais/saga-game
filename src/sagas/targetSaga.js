import { put, call, takeEvery, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';


function *deleteTarget(target) {
    yield put({ type: 'DELETE_TARGET', id: target.id });
}

function *decrementTargetValue() {
    const list = yield select(state => state.targets.list);
    yield put({type: 'DECREMENT_TARGET_VALUE'});
    for (var i = 0; i < list.length; i++) {
        const target = list[i];
        if (target.value <= 1) {
            yield put({type: 'DELETE_TARGET', id: target.id});
            yield put({type: 'GAME_LOOSE_LIVE_REQUESTED'});
        }
    }        
}

function *targetSaga() {
    yield takeEvery('TARGET_DELETE_REQUESTED', deleteTarget);
    yield takeEvery('TARGET_DECREMENT_REQUESTED', decrementTargetValue);
}


export default targetSaga;
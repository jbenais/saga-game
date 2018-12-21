import { put, call, select, takeEvery, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';


function *spaw_new_target() {
    yield put({type: 'ADD_TARGET'});
}

var TIME_INTERVAL = 1000;

function *handle_targets_decrement() {
    while (yield select(state => state.game.isStarted)) {
        yield call(delay, TIME_INTERVAL);
        yield put({type: 'TARGET_DECREMENT_REQUESTED'});
    }
}

function *handle_targets_spawn() {
    while (yield select(state => state.game.isStarted)) {
        yield call(delay, 1000);
        yield spaw_new_target();
        const score = yield select(state => state.game.score);
        if (score >= 5)
            yield spaw_new_target()
        if (score >= 15)
            yield spaw_new_target()
    }
}

function *startGame(action) {
    switch(action.difficulty) {
        case 1:
            TIME_INTERVAL = 1000;
            break;
        case 2:
            TIME_INTERVAL = 750;
            break;
        case 3:
            TIME_INTERVAL = 500;
            break;
    }
    yield put({type: 'GAME_START'});
    yield put({type: 'INIT_TARGET'});
    yield race({decrements: call(handle_targets_decrement), spawn: call(handle_targets_spawn)});
}

function *endGame() {
    yield put({type: 'GAME_END'});
    yield put({type: 'INIT_TARGET'});
}

function *loose_live() {
    const lives = yield select(state => state.game.lives)
    yield put({type: 'LOOSE_LIVE'})
    if (lives === 1)
        yield put({type: 'GAME_END_REQUESTED'});
}

function *increment_score() {
    yield put({type: 'INCREMENT_SCORE'});
}

function *gameSaga() {
    yield takeEvery('GAME_START_REQUESTED', startGame);
    yield takeEvery('GAME_LOOSE_LIVE_REQUESTED', loose_live);
    yield takeEvery('GAME_END_REQUESTED', endGame);
    yield takeEvery('GAME_INCREMENT_SCORE_REQUESTED', increment_score);
}

export default gameSaga;
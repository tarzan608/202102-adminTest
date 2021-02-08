import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
} from '../action/actionTypes';
import { message } from 'antd';

function loginAPI(loginData) {
  // 서버에 요청을 보내는 부분

  return axios.post('http://localhost:8001/api/login', loginData.loginData, {});
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);

    yield put({
      // put은 dispatch 동일
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
    message.success('로그인에 성공하였습니다.');
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_IN_FAILURE,
      error: e.response && e.response.data,
    });
    message.warning('로그인에 실패하였습니다.');
  }
}

function* watchLogin() {
  yield takeEvery(LOG_IN_REQUEST, login);
}

function logoutAPI() {
  // 서버에 요청을 보내는 부분
  return axios.post('http://localhost:8001/api/logout');
}

function* logout() {
  try {
    yield call(logoutAPI);
    yield put({
      // put은 dispatch 동일
      type: LOG_OUT_SUCCESS,
    });
    message.success('로그아웃에 성공하였습니다.');
  } catch (e) {
    // loginAPI 실패
    console.error(e);
    yield put({
      type: LOG_OUT_FAILURE,
      error: e,
    });
    message.warning('로그아웃에 실패하였습니다.');
  }
}

function* watchLogout() {
  yield takeEvery(LOG_OUT_REQUEST, logout);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}

import * as type from '../action/actionTypes';
import { handleActions } from 'redux-actions';

export const initialState = {
  isLoggingIn: false, // 로그인 시도중
  isLoggedIn: false,
  isLoading: false,
  // logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  // logOutError: null,
  // userInfo: null,
  signUpData: {},
  loginData: {},
};

const userReducer = handleActions(
  {
    [type.LOG_IN_REQUEST]: (state, action) => ({
      ...state,
      isLoggingIn: true,
      logInError: null,
      isLoading: true,
    }),

    [type.LOG_IN_SUCCESS]: (state, action) => ({
      ...state,
      isLoggingIn: false,
      loginData: action,
      isLoggedIn: true,
      isLoading: false,
    }),

    [type.LOG_IN_FAILURE]: (state, action) => ({
      ...state,
      isLoggingIn: false,
      logInError: action.error,
      isLoggedIn: false,
      isLoading: false,
    }),

    [type.LOG_OUT_REQUEST]: (state, action) => ({
      ...state,
      logOutLoading: true,
      logOutError: null,
      logOutDone: false,
    }),

    [type.LOG_OUT_SUCCESS]: (state, action) => ({
      ...state,
      logOutLoading: false,
      logOutDone: true,
      loginData: null,
    }),

    [type.LOG_OUT_FAILURE]: (state, action) => ({
      ...state,
      logOutLoading: false,
      logOutError: action.error,
    }),
  },
  initialState
);

export default userReducer;

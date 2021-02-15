import * as React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Login.css';

import axios from 'axios';

const Login = () => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = React.useState({
    userId: '',
    password: '',
  });
  const onClick = () => {
    dispatch({
      type: 'LOG_IN_REQUEST',
      data: { loginData },
    });
  };
  const onChangeId = (e: any) => {
    setLoginData({
      ...loginData,
      userId: e.target.value,
    });
  };
  const onChangePw = (e: any) => {
    setLoginData({
      ...loginData,
      password: e.target.value,
    });
  };
  const onKakao_login = () => {
    axios({
      method: 'get',
      url: 'http://localhost:8001/api/kakao',
    }).then(function (response) {
      console.log('🚀카카오 로그인 결과: ', response);
    });
  };

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input
              type="text"
              name="userId"
              placeholder="아이디"
              onChange={onChangeId}
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={onChangePw}
            />
            <input
              type="button"
              className="button loginBtn"
              onClick={onClick}
              value="로그인"
            />
            <input
              type="button"
              className="button loginBtn"
              onClick={onKakao_login}
              value="카카오 로그인"
            />
            <p className="message">
              아직 계정이 없으신가요? <Link to="/signUp">회원가입</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

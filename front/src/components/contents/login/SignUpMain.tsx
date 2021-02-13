import * as React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './Login.css';
import { RegisterAPI, duplicateCheckAPI } from '../../../api/loginAPI';
import { message } from 'antd';

const Registart = (props: any) => {
  const [registartData, setRegistartData] = React.useState({
    userId: '',
    password: '',
    passwordCheck: '',
    name: '',
    email: '',
    store: '',
    code: '',
  });
  const [idCheck, setIdCheck] = React.useState(null);
  const [passwordCheck, setPasswordCheck] = React.useState(null);
  const onClick = () => {
    RegisterAPI(registartData, function (res: any) {
      if (res.result === 'SUCCESS') {
        message.success('회원가입에 성공하였습니다.');
        props.history.push('/');
      } else {
        message.warning('회원가입에 실패하였습니다. 재시도해주세요');
      }
    });
  };
  const onChangeId = (e: any) => {
    setRegistartData({
      ...registartData,
      userId: e.target.value,
    });
  };
  const onChangePw = (e: any) => {
    setRegistartData({
      ...registartData,
      password: e.target.value,
    });
  };
  const onChangePwCheck = (e: any) => {
    setRegistartData({
      ...registartData,
      passwordCheck: e.target.value,
    });
    console.log(registartData);
    setPasswordCheck(
      registartData.password === e.target.value ? 'SUCCESS' : 'FAILURE'
    );
  };
  const onChangeName = (e: any) => {
    setRegistartData({
      ...registartData,
      name: e.target.value,
    });
  };
  const onChangeEmail = (e: any) => {
    setRegistartData({
      ...registartData,
      email: e.target.value,
    });
  };
  const onChangeStore = (e: any) => {
    setRegistartData({
      ...registartData,
      store: e.target.value,
    });
  };
  const onChangeCode = (e: any) => {
    setRegistartData({
      ...registartData,
      code: e.target.value,
    });
  };
  const duplicateCheck = () => {
    duplicateCheckAPI(registartData.userId, function (res: any) {
      console.log('결과: ', res);
      setIdCheck(res.result);
    });
  };
  React.useEffect(() => {
    console.log('리로딩!', idCheck === 'SUCCESS');
  }, [idCheck]);

  return (
    <>
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input
              type="text"
              id="signUp-id-input"
              name="userId"
              placeholder="아이디"
              onChange={onChangeId}
            />
            <div id="signUp-idCheck" onClick={duplicateCheck}>
              중복체크
            </div>
            {idCheck === 'SUCCESS' ? (
              <p id="idCheck-success">사용 가능한 아이디입니다.</p>
            ) : idCheck === 'FAILURE' ? (
              <p id="idCheck-failure">이미 존재하는 아이디입니다.</p>
            ) : null}
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              onChange={onChangePw}
            />
            <input
              type="password"
              name="passwordCheck"
              placeholder="비밀번호 확인"
              onChange={onChangePwCheck}
            />
            {passwordCheck === 'SUCCESS' ? (
              <p id="idCheck-success">비밀번호가 일치합니다.</p>
            ) : passwordCheck === 'FAILURE' ? (
              <p id="idCheck-failure">비밀번호가 불일치합니다.</p>
            ) : null}
            <input
              type="text"
              name="name"
              placeholder="이름"
              onChange={onChangeName}
            />
            <input
              type="text"
              name="email"
              placeholder="이메일"
              onChange={onChangeEmail}
            />
            <input
              type="text"
              name="store"
              placeholder="상점명"
              onChange={onChangeStore}
            />
            <input
              type="text"
              name="code"
              placeholder="가입코드"
              onChange={onChangeCode}
            />
            <input
              type="button"
              className="button registerBtn"
              value="회원가입"
              onClick={onClick}
            />
            <p className="message">
              이미 가입하셨나요? <Link to="/login">로그인</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(Registart);

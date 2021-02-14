import axios from 'axios';

export const LoginAPI = function (loginData: any) {
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/login',
    data: loginData,
  }).then(function (response) {
    console.log('🚀 로그인 결과: ', response);
  });
};

export const RegisterAPI = function (registartData: any, callback: any) {
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/register',
    data: registartData,
  }).then(function (response) {
    console.log('🚀회원가입 결과: ', response);
    callback(response.data);
  });
};

export const duplicateCheckAPI = function (registartId: any, callback: any) {
  console.log('🚀registartId 값: ', registartId);
  axios({
    method: 'get',
    url: `http://localhost:8001/api/register/duplicate/${registartId}`,
  }).then(function (response) {
    console.log('🚀중복체크 결과: ', response.data.result);
    callback(response.data);
  });
};

export const codeCheckAPI = function (email: string, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/register/emailSend/${email}`,
    data: email,
  }).then(function (response) {
    console.log('🚀이메일 전송 결과: ', response.data);
    callback(response.data);
  });
};

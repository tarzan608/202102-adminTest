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

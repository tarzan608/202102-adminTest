import axios from 'axios';

export const LoginAPI = function (loginData: any) {
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/login',
    data: loginData,
  }).then(function (response) {
    console.log('🚀 ~ file: noticeAPI.js ~ line 11 ~ response', response);
  });
};

export const RegisterAPI = function (registartData: any, callback: any) {
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/register',
    data: registartData,
  }).then(function (response) {
    console.log('🚀결과 값: ', response);
    callback(response.data);
  });
};

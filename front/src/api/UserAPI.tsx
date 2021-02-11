import axios from 'axios';

export const userListAPI = function (options: any, callback: any) {
  console.log('🚀 옵션: ', options);
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/user',
    data: options,
  }).then(function (response) {
    console.log('관리자 조회 결과: ', response);
    callback(response.data.data, response.data.total);
  });
};

export const updateUserAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/user/update/${options.userId}`,
    data: options,
  }).then(function (response) {
    console.log('관리자 수정 결과: ', response);
    callback(response.data);
  });
};

export const deleteUserAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/user/delete`,
    data: options,
  }).then(function (response) {
    console.log('관리자 삭제 결과: ', response);
    callback(response.data);
  });
};

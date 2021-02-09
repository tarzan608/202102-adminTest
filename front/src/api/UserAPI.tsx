import axios from 'axios';

export const userListAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/user',
    data: options,
  }).then(function (response) {
    console.log('🚀사용자 조회 결과: ', response);
    callback(response.data);
  });
};

export const updateUserAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/user/update/${options.userId}`,
    data: options,
  }).then(function (response) {
    console.log('🚀사용자 수정 결과: ', response);
    callback(response.data);
  });
};

export const deleteUserAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/user/delete`,
    data: options,
  }).then(function (response) {
    console.log('🚀사용자 삭제 결과: ', response);
    callback(response.data);
  });
};

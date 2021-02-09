import axios from 'axios';

export const memberListAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/member',
    data: options,
  }).then(function (response) {
    console.log('🚀사용자 조회 결과: ', response);
    callback(response.data.data, response.data.total);
  });
};

export const updateMemberAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/member/update/${options.userId}`,
    data: options,
  }).then(function (response) {
    console.log('🚀사용자 수정 결과: ', response);
    callback(response.data);
  });
};

export const deleteMemberAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/member/delete`,
    data: options,
  }).then(function (response) {
    console.log('🚀사용자 삭제 결과: ', response);
    callback(response.data);
  });
};

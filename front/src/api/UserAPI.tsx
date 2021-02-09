import axios from 'axios';

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

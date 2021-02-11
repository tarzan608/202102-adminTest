import axios from 'axios';

export const storeListAPI = function (options: any, callback: any) {
  console.log('🚀 옵션: ', options);
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/store',
    data: options,
  }).then(function (response) {
    console.log('🚀상점 조회 결과: ', response);
    callback(response.data.data, response.data.total);
  });
};

export const createStoreAPI = function (options: any, callback: any) {
  console.log('🚀 상점추가 옵션: ', options);
  axios({
    method: 'post',
    url: `http://localhost:8001/api/store/create`,
    data: options,
  }).then(function (response) {
    console.log('🚀상점 추가 결과: ', response);
    callback(response.data);
  });
};

export const updateStoreAPI = function (options: any, callback: any) {
  console.log('🚀 상점수정 옵션: ', options);
  axios({
    method: 'post',
    url: `http://localhost:8001/api/store/update/${options.storeId}`,
    data: options,
  }).then(function (response) {
    console.log('🚀상점 수정 결과: ', response);
    callback(response.data);
  });
};

export const deleteStoreAPI = function (options: any, callback: any) {
  console.log('🚀 상점삭제 옵션: ', options);
  axios({
    method: 'post',
    url: `http://localhost:8001/api/store/delete`,
    data: options,
  }).then(function (response) {
    console.log('🚀상점 삭제 결과: ', response);
    callback(response.data);
  });
};

import axios from 'axios';

export const productListAPI = function (options: any, callback: any) {
  console.log('🚀 상품 조회 옵션: ', options);
  axios({
    method: 'post',
    url: 'http://localhost:8001/api/product',
    data: options,
  }).then(function (response) {
    console.log('🚀상품 조회 결과: ', response);
    callback(response.data.data, response.data.total);
  });
};

export const createProductAPI = function (options: any, callback: any) {
  console.log('🚀 상점 추가 옵션: ', options);
  axios({
    method: 'post',
    url: `http://localhost:8001/api/product/create`,
    data: options,
  }).then(function (response) {
    console.log('🚀상품 추가 결과: ', response);
    callback(response.data);
  });
};

export const updateProductAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/product/update/${options.userId}`,
    data: options,
  }).then(function (response) {
    console.log('🚀상품 수정 결과: ', response);
    callback(response.data);
  });
};

export const deleteProductAPI = function (options: any, callback: any) {
  axios({
    method: 'post',
    url: `http://localhost:8001/api/product/delete`,
    data: options,
  }).then(function (response) {
    console.log('🚀상품 삭제 결과: ', response);
    callback(response.data);
  });
};

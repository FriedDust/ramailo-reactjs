import axios from 'axios';

export function post(uri, data) {
  return axios({
    method: 'post',
    url: uri,
    data: data
  });
}

export function put(uri, data) {
  return axios({
    method: 'put',
    url: uri,
    data: data
  });
}

export function patch(uri, data) {
  return axios({
    method: 'patch',
    url: uri,
    data: data
  });
}

export function get(uri, params = {}, headers = {'Content-Type': 'application/json'}) {
  return axios({
    method: 'get',
    url: uri,
    params: params,
    data: {},
    headers: headers,
  });
}

export function del(uri, data) {
  return axios({
    method: 'delete',
    data: data,
    url: uri
  });
}

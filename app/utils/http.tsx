import axios from 'axios';
import swal from 'sweetalert2';

axios.interceptors.response.use(function (response: any) {
    return response;
}, function (error: any) {
    let errorResponse = error.response;
    swal({
        title: `${errorResponse.status} ${errorResponse.statusText}`,
        text: errorResponse.data.error,
        type: 'error'
    });
    return Promise.reject(error);
});

//
// export function post(uri, data) {
//   return axios({
//     method: 'post',
//     url: uri,
//     data: data
//   });
// }
//
// export function put(uri, data) {
//   return axios({
//     method: 'put',
//     url: uri,
//     data: data
//   });
// }
//
// export function patch(uri, data) {
//   return axios({
//     method: 'patch',
//     url: uri,
//     data: data
//   });
// }

export function get(uri: string, params = {}, headers = {'Content-Type': 'application/json'}) {
    return axios({
        method: 'get',
        url: uri,
        params: params,
        data: {},
        headers: headers,
    });
}

export function destroy(uri: string, data?: any) {
    return axios({
        method: 'delete',
        data: data,
        url: uri
    });
}

// export function axiosRequest(params) {
//     return axios(params);
// }

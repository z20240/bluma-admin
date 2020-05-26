import request from './request';
// import md5 from 'js-md5';

export function loginByUsername(username, password) {
    const authData = {
        username,
        password
    };
    console.log('loginByUsername -> authData', authData);
    const data = {
        test: 1234,
        what: 'daa'
    };
    console.log('loginByUsername -> data', data);

    return request({
        url: '/api/users/login',
        method: 'post',
        auth: authData,
        data
    });
}

export function logout(token) {
    const data = {
        token
    };
    return request({
        url: '/api/logout',
        method: 'post',
        data
    });
}

export function getUserInfo(token) {
    const data = {
        token
    };
    return request({
        url: '/api/user/info',
        method: 'post',
        data
    });
}
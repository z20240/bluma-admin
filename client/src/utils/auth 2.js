import Cookies from 'js-cookie';

const TokenKey = 'X-Token';
const IpKey = 'Networker-Client-IP';

export function getToken() {
    return Cookies.get(TokenKey);
}

export function setToken(token) {
    return Cookies.set(TokenKey, token);
}

export function removeToken() {
    return Cookies.remove(TokenKey);
}

export function getIP() {
    return Cookies.get(IpKey);
}

export function setIP(ip) {
    return Cookies.set(IpKey, ip);
}

export function removeIP() {
    return Cookies.remove(IpKey);
}

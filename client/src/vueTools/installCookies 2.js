import Cookies from 'js-cookie';
const NameList = ['auth', 'authProfile'];

const VueCookie = {
    install: function (Vue) {
        Vue.prototype.$cookie = Cookies;
        // Vue.cookie = this;
        window.clog = () => {
            NameList.forEach(el=> console.log(`${el}:`, JSON.parse(Cookies.get(el))));
        };
        window.loginOut = () =>{
            NameList.forEach(el=> Cookies.remove(el));
            window.location.replace('/');
        };
    }
};
export default VueCookie;
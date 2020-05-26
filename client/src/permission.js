import Utils from '@/utils/index.js';
import router from '@/router';
import store from '@/store';
import Cookies from 'js-cookie';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration

/* Default title tag */
const defaultDocumentTitle = '中正大學 - 犯罪防治中心';

router.beforeEach(async (to, from, next) => {

    NProgress.start();

    if (!Utils.isEmpty(Cookies.get('user'))) {
        const user = JSON.parse(Cookies.get('user'));
        store.commit('app/LOGIN', user);
    } else {
        // 要到的頁面 (to)，它的 meta 如果有 requiresAuth 的話，就"不會"直接放行
        if (to.meta.requiresAuth) return next('/login');
    }

    NProgress.done();

    // 反之，若沒有 requiresAuth 的話，就會直接放行
    next();

});

/* Collapse mobile aside menu on route change & set document title from route meta */
router.afterEach(to => {
    store.commit('app/asideMobileStateToggle', false);

    if (to.meta.title) {
        document.title = `${to.meta.title} — ${defaultDocumentTitle}`;
    } else {
        document.title = defaultDocumentTitle;
    }
});
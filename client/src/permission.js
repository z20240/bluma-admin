import Utils from '@/utils';
import router from '@/router';
import store from '@/store';
import NProgress from 'nprogress'; // progress bar
import 'nprogress/nprogress.css'; // progress bar style
import { SnackbarProgrammatic } from 'buefy';
import { getUserInfo } from '@/api';
import { getToken } from '@/utils/auth';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

/* Default title tag */
const defaultDocumentTitle = '中正大學 - 犯罪防治中心';

router.beforeEach(async (to, from, next) => {
    console.log('to', to);
    NProgress.start();

    const token = getToken();

    if (Utils.isEmpty(token)) {
        // 要到的頁面 (to)，它的 meta 如果有 requiresAuth 的話，就"不會"直接放行
        if (to.meta.requiresAuth) next('/login');
        else next();
    } else {
        if (to.path === '/login') next('/');
        else {
            if (Utils.isEmpty(store.getters.userInfo)) {
                try {
                    const { data } = await getUserInfo(token);
                    console.log('~~~~> isEmpty', data);
                    store.dispatch('app/userInfo', data.Item);
                } catch (err) {
                    await SnackbarProgrammatic.open({
                        message: `${err.message}`,
                        type: 'is-danger',
                        queue: false
                    });

                    store.dispatch('app/userLogout').then(() => {
                        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
                    });
                }
            }
            next();
        }
    }

    NProgress.done();

    // 反之，若沒有 requiresAuth 的話，就會直接放行
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

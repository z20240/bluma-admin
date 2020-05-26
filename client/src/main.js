/* Styles */
import '@mdi/font/css/materialdesignicons.css';

/* Core */
import Vue from 'vue';
import Buefy from 'buefy';

/* Router & Store */
import router from './router';
import store from './store';

/* Service Worker */
import './registerServiceWorker';

/* Vue. Main component */
import App from './App.vue';

import InstallCookies from './vueTools/installCookies';

import './permission';

Vue.config.productionTip = false;

Vue.use(Buefy);

Vue.use(InstallCookies);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

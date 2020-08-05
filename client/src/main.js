/* Styles */
import '@mdi/font/css/materialdesignicons.css';

/* Core */
import Vue from 'vue';
import Buefy from 'buefy';
Vue.use(Buefy);

/* Router & Store */
import router from './router';
import store from './store';

/* Service Worker */
import './registerServiceWorker';

/* Vue. Main component */
import App from './App.vue';

import InstallCookies from './vueTools/installCookies';
Vue.use(InstallCookies);

import VueCompositionAPI from '@vue/composition-api';
Vue.use(VueCompositionAPI);

import './permission';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

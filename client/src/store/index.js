import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie';

import app from './modules/app';
import question from './modules/question';
import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        question
    },
    getters
});

store.$cookie = Cookies;

export default store;

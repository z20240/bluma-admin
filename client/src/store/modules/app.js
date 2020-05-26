import { loginByUsername } from '@/api';

const state = {
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,
    token: '',

    /* NavBar */
    isNavBarVisible: true,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: true,
    isAsideMobileExpanded: false
};

const mutations = {
    /* A fit-them-all commit */
    basic(state, payload) {
        state[payload.key] = payload.value;
    },

    /* User */
    LOGIN(state, payload) {
        state.userName = payload.name;
        state.userEmail = payload.email;
        state.userAvatar = payload.avatar;
    },

    /* Aside Mobile */
    asideMobileStateToggle(state, payload = null) {
        const htmlClassName = 'has-aside-mobile-expanded';

        let isShow;

        if (payload !== null) {
            isShow = payload;
        } else {
            isShow = !state.isAsideMobileExpanded;
        }

        console.log('asideMobileStateToggle -> isShow', isShow);
        if (isShow) {
            document.documentElement.classList.add(htmlClassName);
        } else {
            document.documentElement.classList.remove(htmlClassName);
        }

        state.isAsideMobileExpanded = isShow;
    }
};

const actions = {
    async userLogin(
        { commit },
        payload = { name: 'John Doe', password: '123456' }
    ) {
        try {
            // to api update
            const details = {
                status: 1,
                email: 'john@example.com',
                avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
            };

            const user = { ...payload, ...details };
            const {data} = await loginByUsername(payload.name, payload.password);
            console.log('data', data);

            this.$cookie.set('user', data.token);
            commit('LOGIN', user);

            return user;
        } catch (err) {
            console.log('err', err);
        }
    },
    async userUpdate({ commit }, payload) {
        try {
            // to api update

            this.$cookie.set('user', payload);
            commit('LOGIN', payload);

            return payload;
        } catch (err) {
            console.log('userUpdate -> err', err);
        }
    },
    async userPassword({ commit }, payload) {
        try {
            // to api update

            this.$cookie.set('user', payload);
            commit('LOGIN', payload);

            return payload;
        } catch (err) {
            console.log('userPassword -> err', err);
        }
    },
    userLogout({ commit }) {
        this.$cookie.remove('user');
        commit('LOGIN', {});

        return;
    }
};

const getters = {
    userName: state => state.userName,
    userEmail: state => state.userEmail,
    userAvatar: state => state.userAvatar,
    isNavBarVisible: state => state.isNavBarVisible,
    isFooterBarVisible: state => state.isFooterBarVisible,
    isAsideVisible: state => state.isAsideVisible,
    isAsideMobileExpanded: state => state.isAsideMobileExpanded
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

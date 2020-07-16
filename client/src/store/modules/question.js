import { apiCreateQuestion, apiGetQuestion, apiUpdateQuestion, apiDeleteQuestion } from '@/api';

const state = {
    /** @type {import('../../interface/IQuestion').IQuestion[]} */
    questions: [],
    isloading: false,
};

/** @type {import('vuex').MutationTree<typeof state>} */
const mutations = {
    START_LOADING: state => state.isloading = true,
    END_LOADING: state => state.isloading = false,
    /** @param {import('../../interface/IQuestion').IQuestion[]} list */
    QUERY_QUESTION: (state, list) => {
        state.questions = list;
    },
    /** @param {import('../../interface/IQuestion').IQuestion} payload */
    ADD_QUESTION: (state, payload) => {
        state.questions = [payload, ...state.questions];
    },
    /** @param {import('../../interface/IQuestion').IQuestion} payload */
    UPDATE_QUESTION: (state, payload) => {
        const idx = state.questions.findIndex(ele => ele.id === payload.id);
        state.questions.splice(idx, 1, payload);
    },
    /** @param {import('../../interface/IQuestion').IQuestion} payload */
    DELETE_QUESTION: (state, payload) => {
        state.questions = state.questions.filter(ele => ele.id !== payload.id);
    },
};

/** @type {import('vuex').ActionTree<typeof state>} */
const actions = {
    /**
     * @param {object} param0
     * @param {import('vuex').Commit} param0.commit
     * @param {import("../../interface/IQuestion").IQuestion} payload
     */
    async createQuestion(
        { commit },
        payload
    ) {
        try {
            commit('START_LOADING');

            await apiCreateQuestion(payload);

            commit('ADD_QUESTION', payload);
            commit('END_LOADING');

            return payload;
        } catch (err) {
            console.error('err', err);
        }
    },
    /**
     * @param {object} param0
     * @param {import('vuex').Commit} param0.commit
     * @param {import("../../interface/IQuestion").IQuestion} payload
     */
    async getQuestions(
        { commit }
    ) {
        try {

            const { data } = await apiGetQuestion();

            commit('QUERY_QUESTION', data.Data);

            return data;
        } catch (err) {
            console.error('err', err);
        }
    },
    /**
     * @param {object} param0
     * @param {import('vuex').Commit} param0.commit
     * @param {import("../../interface/IQuestion").IQuestion} payload
     */
    async updateQuestion(
        { commit },
        payload
    ) {
        try {

            await apiUpdateQuestion(payload);

            commit('UPDATE_QUESTION', payload);

            return payload;
        } catch (err) {
            console.error('err', err);
        }
    },
    /**
     * @param {object} param0
     * @param {import('vuex').Commit} param0.commit
     * @param {import("../../interface/IQuestion").IQuestion} payload
     */
    async deleteQuestion(
        { commit },
        payload
    ) {
        try {

            await apiDeleteQuestion(payload);

            commit('DELETE_QUESTION', payload);

            return payload;
        } catch (err) {
            console.error('err', err);
        }
    },
};

/** @type {import('vuex').GetterTree<typeof state>} */
const getters = {
    questions: state => state.questions,
    isloading: state => state.isloading,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

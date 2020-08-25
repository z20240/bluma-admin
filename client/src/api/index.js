import { loginByUsername, logout, getUserInfo } from './app';
import { createQuestion, getQuestion, updateQuestion, deleteQuestion, getExam } from './question';

/** auth */
export const apiLoginByUsername = loginByUsername;
export const apiLogout = logout;
export const apiGetUserInfo = getUserInfo;

/** Question */
export const apiCreateQuestion = createQuestion;
export const apiGetQuestion = getQuestion;
export const apiUpdateQuestion = updateQuestion;
export const apiDeleteQuestion = deleteQuestion;
export const apiGetExams = getExam;
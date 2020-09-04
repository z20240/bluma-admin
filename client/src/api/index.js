import { loginByUsername, logout, getUserInfo } from './app';
import { createQuestion, getQuestion, getAllQuestions, updateQuestion, deleteQuestion, getExam, postAnswers } from './question';
import { getHistory } from './history';

/** auth */
export const apiLoginByUsername = loginByUsername;
export const apiLogout = logout;
export const apiGetUserInfo = getUserInfo;

/** Question */
export const apiCreateQuestion = createQuestion;
export const apiGetQuestion = getQuestion;
export const apiGetAllQuestion = getAllQuestions;
export const apiUpdateQuestion = updateQuestion;
export const apiDeleteQuestion = deleteQuestion;
export const apiGetExams = getExam;
export const apiGetResult = postAnswers;

/** History */
export const apiGetHistory = getHistory;
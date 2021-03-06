import request from './request';

export function getQuestion() {
    return request({
        url: '/api/questions',
        method: 'get'
    });
}

export function getAllQuestions() {
    return request({
        url: '/api/questions/all',
        method: 'get'
    });
}

/**
 * @param {import('../interface/IQuestion').IQuestion} data
 */
export function createQuestion(data) {
    return request({
        url: '/api/questions',
        method: 'post',
        data
    });
}

/**
 * @param {import('../interface/IQuestion').IQuestion} data
 */
export function updateQuestion(data) {
    return request({
        url: '/api/questions',
        method: 'put',
        data
    });
}

/**
 * @param {import('../interface/IQuestion').IQuestion} data
 */
export function deleteQuestion(data) {
    return request({
        url: '/api/questions',
        method: 'delete',
        data
    });
}

export function getExam() {
    return request({
        url: '/api/exam',
        method: 'get'
    });
}

export function postAnswers(data) {
    return request({
        url: '/api/exam/validate-answers',
        method: 'post',
        data
    });
}

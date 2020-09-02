import request from './request';

/**
 * @param { import('../interface/IHistory').IQueryOption } query
 */
export function getHistory(query) {
    return request({
        url: '/api/history',
        method: 'get',
        params: query
    });
}

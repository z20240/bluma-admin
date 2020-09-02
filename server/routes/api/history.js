/** @format */

/**
 * @typedef IDetail
 * @property {number} id
 * @property {boolean} correct
 */

/**
 * @typedef IAnswer
 * @property {string} ip
 * @property {string} time
 * @property {number} score
 * @property {IDetail[]} details
 */

/**
 * @typedef IId
 * @property {number} id
 *
 *
 * @typedef {IAnswer & IId} ILog
 */

var express = require('express');
var router = express.Router();
var promisify = require('util').promisify;
const Response = require('../../response');
const { Database } = require('../../database/mongodb');
const moment = require('moment');

router.get('/', async function (req, res) {

    const startTime = req.query.startTime || moment('2020-01-01T00:00:00Z').toISOString();
    const endTime = req.query.endTime || moment().toISOString();

    const db_cursor = req.app.locals.db.collection(Database.tables.Log).find({
        time: {
            $gte: startTime,
            $lt: endTime
        }
    }).sort({ time: -1 });

    const db_toArrayAsync = promisify(db_cursor.toArray).bind(db_cursor);

    try {
        const result = /** @type {ILog[]} */ (await db_toArrayAsync());

        res.json(Response.success({ Data: result }));

    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

module.exports = router;

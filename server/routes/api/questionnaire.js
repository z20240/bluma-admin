/** @format */

var express = require('express');
var router = express.Router();
var promisify = require('util').promisify;
const Response = require('../../response');
const { Database } = require('../../database/mongodb');

const CONST = {
    MAX_QUESTION_NUMBER: 10,
};

router.get('/', async function (req, res) {
    const db_cursor = req.app.locals.db.collection(Database.tables.Question).find({});
    const db_toArrayAsync = promisify(db_cursor.toArray).bind(db_cursor);
    let result;

    try {
        result = await db_toArrayAsync();

        console.log('req.app.locals.db.collection -> result', result);

        const questions = [];
        for (let i = 0; i < CONST.MAX_QUESTION_NUMBER; i++) {
            const rnd = ~~(Math.random() * result.length);
            questions.push(result.splice(rnd, 1));
        }
        console.log('questions', questions);

        res.json(Response.success({ Data: questions }));
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

module.exports = router;

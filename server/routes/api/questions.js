/** @format */

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var promisify = require('util').promisify;

const Response = require('../../response');

const { Database, GetSequenceNextValue } = require('../../database/mongodb');

router.get('/', async function (req, res) {
    // jwt 會做 auth, 並且將資料寫入 req.user
    console.log('req.user', req.user);

    const db_cursor = req.app.locals.db
        .collection(Database.tables.Question)
        .find({});
    const db_toArrayAsync = promisify(db_cursor.toArray).bind(db_cursor);
    let result;

    try {
        result = await db_toArrayAsync();
        console.log('req.app.locals.db.collection -> result', result);

        res.json(Response.success({ Data: result }));
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

router.post('/', async function (req, res) {
    const payload = req.body;
    console.log('payload', payload);

    try {
        const id = (await GetSequenceNextValue(Database.tables.Question)) + 1;
        const dbQuestion = req.app.locals.db.collection(
            Database.tables.Question
        );

        await dbQuestion.insertOne({
            ...payload,
            id,
        });

        res.json(Response.success({ ID: id }));
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

router.post('/info', async function (req, res) {
    const content = req.body;
    console.log('content', content);
    if (!content.token) return res.json(Response.failed('No token'));

    try {
        const str_payload = await jwt.verify(
            content.token,
            process.env.JWT_SECRET
        );

        const payload = JSON.parse(str_payload.data);

        const username = payload.username;

        const user = await req.app.locals.db.collection('user').findOne({
            username: { $eq: username },
        });

        const userInfo = {
            name: user.username,
            email: user.email,
            avatar: user.avatar,
            status: user.status,
        };

        res.json(Response.success({ Item: userInfo }));
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

module.exports = router;

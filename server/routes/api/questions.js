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

router.put('/', async function (req, res) {
    const payload = req.body;
    console.log('payload', payload);

    delete payload._id;

    try {
        const dbQuestion = req.app.locals.db.collection(
            Database.tables.Question
        );

        await dbQuestion.updateOne(
            { id: { $eq: payload.id } },
            { $set: payload },
        );

        res.json(Response.success());
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

router.delete('/', async function (req, res) {
    const payload = req.body;
    console.log('payload', payload);

    try {

        const result = await req.app.locals.db.collection(Database.tables.Question).deleteOne({ id: { $eq: payload.id } });

        console.log('result', result);

        res.json(Response.success());
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

module.exports = router;

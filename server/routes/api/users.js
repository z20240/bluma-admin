/** @format */

var express = require('express');
var router = express.Router();
var promisify = require('util').promisify;

const { Base64 } = require('js-base64');
const jwt = require('jsonwebtoken');

const Response = require('../../response');

const {Database} = require('../../database/mongodb');

router.get('/', async function (req, res) {
    // console.log('req.app.locals.db', req.app.locals.db);
    const db_cursor = req.app.locals.db.collection(Database.tables.User).find({});
    const db_toArrayAsync = promisify(db_cursor.toArray).bind(db_cursor);
    let result;

    try {
        result = await db_toArrayAsync();
        console.log('req.app.locals.db.collection -> result', result);
    } catch(err) {
        console.error('err', err);
    }

    res.json(Response.success({ Data: result }));
});


router.post('/login', async function (req, res) {
    console.log('req.user', req.user);

    if (!req.headers.authorization) return res.json(Response.failed('Invalid User.'));

    const token = req.headers.authorization.split(' ')[1];

    const [username, password] = Base64.decode(token).split(':');
    console.log('username, password', username, password);

    const user = await req.app.locals.db.collection(Database.tables.User).findOne({
        username: { $eq: username },
        password: { $eq: password }
    });
    console.log('user', user);

    if (!user) return res.json(Response.failed('Invalid User.'));

    // console.log('JWT_SECRET', process.env.JWT_SECRET);

    const jwtToken = jwt.sign(
        { data: JSON.stringify({ username }) },
        process.env.JWT_SECRET,
        { expiresIn: 8 * 3600 }
    );

    res.json(Response.success({ Token: jwtToken }));
});


router.post('/info', async function (req, res) {
    const content = req.body;
    console.log('content', content);
    if (!content.token) return res.json(Response.failed('No token'));

    try {
        const str_payload = await jwt.verify(content.token, process.env.JWT_SECRET);

        const payload = JSON.parse(str_payload.data);

        const username = payload.username;

        const user = await req.app.locals.db.collection(Database.tables.User).findOne({
            username: { $eq: username }
        });

        const userInfo = {
            name: user.username,
            email: user.email,
            avatar: user.avatar,
            status: user.status
        };

        res.json(Response.success({Item: userInfo}));
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

router.post('/add', async function (req, res) {
    const content = req.body;

    if (!content.username || !content.password || !content.email) {
        return res.json(Response.failed('No user name, password or email'));
    }

    console.log('content', content);

    try {

        const payload = {
            username: content.username,
            email: content.email,
            password: content.password,
            status: 1,
            avatar : 'https://i.pravatar.cc/300',
        };

        await req.app.locals.db.collection(Database.tables.User).insertOne(payload);

        delete payload.password;

        res.json(Response.success({Item: payload}));
    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});

module.exports = router;

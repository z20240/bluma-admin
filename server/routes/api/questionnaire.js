/** @format */

/**
 * @typedef IAnswer
 * @property {number} id
 * @property {string} option
 */

/**
 * @typedef IQuestion
 * @property {object} _id
 * @property {number} id
 * @property {string} question
 * @property {IAnswer} answer
 * @property {number} correct
 */

var express = require('express');
var router = express.Router();
var promisify = require('util').promisify;
const Response = require('../../response');
const { Database, GetSequenceNextValue } = require('../../database/mongodb');

const CONST = {
    MAX_QUESTION_NUMBER: 10,
};

router.get('/', async function (req, res) {

    const db_cursor = req.app.locals.db.collection(Database.tables.Question).find({});
    const db_toArrayAsync = promisify(db_cursor.toArray).bind(db_cursor);

    try {
        const result = /** @type {IQuestion[]} */ (await db_toArrayAsync());

        let questions = [];
        const MAX_QUESTION_NUMBER = Math.min(CONST.MAX_QUESTION_NUMBER, result.length);

        for (let i = 0; i < MAX_QUESTION_NUMBER; i++) {
            const rnd = ~~(Math.random() * result.length);
            questions = [...questions,  ...result.splice(rnd, 1)];
        }

        res.json(Response.success({ Data: questions }));

    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});


router.post('/validate-answers', async (req, res) => {

    /** @type { {answers: {[id: string]: number}, ip: string} } */
    const { answers, ip } = req.body;

    const db_cursor = req.app.locals.db.collection(Database.tables.Question).find({});
    const db_toArrayAsync = promisify(db_cursor.toArray).bind(db_cursor);

    try {
        const result = /** @type {IQuestion[]} */ (await db_toArrayAsync());

        const chooseQuestionIDs = Object.keys(answers).map(id => Number(id));

        const questions = result.filter(question => chooseQuestionIDs.includes(question.id));

        const checkAnswers = questions.map(question => ({ id : question.id, correct: Number(question.correct) === answers[question.id] }));

        const resultAnswer = {
            ip: ip || '',
            time: new Date().toISOString(),
            score: checkAnswers.filter(answer => answer.correct).length * 10,
            details: checkAnswers
        };

        const dbQuestion = req.app.locals.db.collection(Database.tables.Log);
        const id = (await GetSequenceNextValue(Database.tables.Log)) + 1;

        await dbQuestion.insertOne({
            ...resultAnswer,
            id,
        });

        res.json(Response.success({ Score: resultAnswer.score, Details: resultAnswer.details }));

    } catch (err) {
        console.error('err', err);
        res.json(Response.failed(err.message));
    }
});
module.exports = router;

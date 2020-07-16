/** @format */

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports.CreateDB = async function (app, db_name) {
    // Create a MongoDB connection pool and start the application
    // after the database connection is ready
    MongoClient.connect(url, {
        promiseLibrary: Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }, (err, db) => {
        if (err) {
            console.warn(`Failed to connect to the database. ${err.stack}`);
        }
        app.locals.db = db.db(db_name);
    });
};

module.exports.GetSequenceNextValue = (db_collection) => {

    // 這個有 bug
    var seqDoc = db_collection.findAndModify({
        query: { _id: 'itemId' },
        update: { $inc: { seqValue: 1 } },
        new: true
    });

    return seqDoc.seqValue;
};

module.exports.Database = {
    name: process.env.MONGO_DB,
    tables: {
        User: 'user',
        Question: 'question',
    }
};
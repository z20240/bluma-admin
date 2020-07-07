/** @format */

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = async function (app, db_name) {
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

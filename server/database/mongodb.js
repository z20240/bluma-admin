/** @format */
var promisify = require("util").promisify;
const MongoClient = require("mongodb").MongoClient;
const url = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`;
console.log("🚀 ~ file: mongodb.js ~ line 5 ~ url", url);

const CreateDB = async function (db_name, app = null) {
  // Create a MongoDB connection pool and start the application
  // after the database connection is ready
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      url,
      {
        promiseLibrary: Promise,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err, db) => {
        if (err) {
          console.error(`Failed to connect to the database. ${err.stack}`);
          reject(err);
        }

        if (app) app.locals.db = db.db(db_name);

        resolve(db.db(db_name));
      }
    );
  });
};

const GetSequenceNextValue = async (tableName) => {
  const db = await CreateDB(process.env.DATABASE_DB);
  const db_collection = db.collection("autoIncrease");

  const dbFindOneAndUpdateAsync = promisify(db_collection.findOneAndUpdate).bind(db_collection);

  const result = await dbFindOneAndUpdateAsync(
    { _id: tableName },
    { $inc: { seqValue: 1 } },
    { upsert: true, returnNewDocument: true }
  );

  const seqDoc = result.value;

  return seqDoc ? seqDoc.seqValue : 0;
};

module.exports.Database = {
  name: process.env.DATABASE_DB,
  tables: {
    User: "user",
    Question: "question",
    Log: "log",
  },
};

module.exports.CreateDB = CreateDB;
module.exports.GetSequenceNextValue = GetSequenceNextValue;

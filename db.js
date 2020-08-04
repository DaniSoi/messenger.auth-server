const mongoose = require('mongoose');

async function connectDB () {
  const { MONGO_HOST, MONGO_PORT, MONGOLAB_URI } = process.env;
  const MONGO_URI = `mongodb://${MONGO_HOST || 'localhost'}:${MONGO_PORT || '27017'}/messenger-app`;
  try {
    const { connection } = await mongoose.connect(
      MONGOLAB_URI || MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true, // mongoose will use createIndex instead of ensureIndex which is deprecated
        useFindAndModify: false // make findOneAndUpdate() use native findOneAndUpdate() rather than findAndModify()
      }
    );

    console.log(`DB: connected to: ${connection.host}`);
  } catch (e) {
    console.error('DB: initial connection failed: ', e);
    process.exit(1);
  }

  mongoose.connection.on('error', err => {
    console.error(err);
    console.log('DB: connection failed, mongoose trying to reconnect');
  });
}

module.exports = connectDB;

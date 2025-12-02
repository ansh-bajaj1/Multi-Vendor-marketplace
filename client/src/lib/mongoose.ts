import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/marketplace';

declare global {
  // eslint-disable-next-line no-var
  var __mongoose__: any;
}

async function dbConnect() {
  if (!MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable inside .env.local');
  }

  // Reuse existing connection in development to avoid exhausting connections
  if (global.__mongoose__ && global.__mongoose__.conn) {
    return global.__mongoose__.conn;
  }

  if (!global.__mongoose__) global.__mongoose__ = { conn: null, promise: null };

  if (!global.__mongoose__.promise) {
    // Connect using current mongoose defaults. Passing legacy driver options
    // can cause MongoParseError with newer mongodb driver versions.
    global.__mongoose__.promise = mongoose.connect(MONGO_URI).then((mongooseIns) => {
      return mongooseIns.connection;
    });
  }

  global.__mongoose__.conn = await global.__mongoose__.promise;
  return global.__mongoose__.conn;
}

export default dbConnect;

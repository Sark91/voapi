import mongoose from 'mongoose';

console.log(
  process.env.SERVER_PORT,
  process.env.DB_HOST,
  process.env.DB_PORT,
  process.env.DB_USER,
  process.env.DB_PASS,
  process.env.DB_NAME,
);

export default mongoose.createConnection(
  process.env.DB_HOST,
  process.env.DB_NAME,
  process.env.DB_PORT, {
    server: { auto_reconnect: true },
    user: process.env.DB_USER,
    pass: process.env.DB_PASS
  }
);
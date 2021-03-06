import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const connection = onConnectCb => mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME}`,
  {
    server: { auto_reconnect: true },
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || '',
  },
  onConnectCb,
);

connection.disconnect = cb => mongoose.connection.close(cb);
connection.getConnection = () => mongoose.connection;

process.on('SIGINT', () => {
  connection.disconnect(() => {
    process.exit(0);
  });
});

export default connection;
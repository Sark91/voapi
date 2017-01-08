import mongoose from 'mongoose';

const connection = mongoose.connect(
  `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT || 27017}/${process.env.DB_NAME}`,
  {
    server: { auto_reconnect: true },
    user: process.env.DB_USER || '',
    pass: process.env.DB_PASS || ''
  }
);

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    process.exit(0);
  });
});

export default connection;
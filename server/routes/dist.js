import express from 'express';
import path from 'path';

const indexFile = path.resolve(__dirname, '../../dist/index.html');

export default (app) => {
  app.use(express.static(path.resolve(__dirname, '../../dist')));
  app.get('/*', (req, res) => {
    res.sendFile(indexFile, (err) => {
      if (err) res.status(err.status).end();
    });
  });

  return app;
};
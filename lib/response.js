const fs = require('fs');
const logger = require('./logger');

module.exports = {
  ok: (dir, res, msg, opts) => {
    res.writeHead(200, opts);
    res.end(msg);

    logger.log(`[200] ${dir}`);
  },
  notFound: (dir, res, msg) => {
    res.writeHead(404);
    res.end(`Not found, ${msg}`);

    logger.log(`[404] ${dir}`);
  },
  internalError: (dir, res, msg) => {
    res.writeHead(500);
    res.end(`Internal Server Error, ${msg}`);

    logger.log(`[500] ${dir}`);
  },
  stream: (file, res, size) => {
    res.writeHead(200, { 'Content-Length': size });
    const readStream = fs.createReadStream(file);
    readStream.pipe(res);

    logger.log(`[200] stream ${file}`);
  },
};

const fs = require('fs');
const path = require('path');
const http = require('http');
const system = require('./system');
const logger = require('./logger');
const response = require('./response');

module.exports = (prt, dirBase) => {
  const server = http.createServer((req, res) => {
    const dir = path.join(dirBase, req.url);
    const url = req.url + (req.url.endsWith('/') ? '' : '/');

    fs.stat(dir, (err, stat) => {
      if (err == null) {
        if (stat.isFile()) {
          response.stream(dir, res, stat.size);
        } else if (stat.isDirectory()) {
          response.ok(dir, res, system.dirToHTMLList(dir, url), { 'Content-Type': 'text/html'});
        } else {
          response.internalError(dir, res, 'The request does not correspond to a directory or file');
        }
      } else if (err.code === 'ENOENT') {
        response.notFound(dir, res, 'The directory or file does not exist');
      } else {
        response.internalError(dir, res, err.code);
      }
    });
  });

  const port = parseInt(prt, 10) || 9505;

  server.listen(port);

  logger.log(`Server running in port ${port}`);
};

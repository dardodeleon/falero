const fs = require('fs');
const { exec } = require('child_process');
const logger = require('./logger');

const intToJSONDate = (time, prefix, sufix) => {
  let date = '';
  if (time.replace(/[0-9]/gi, '') === '') {
    date = `${prefix}${(new Date(Number(time))).toJSON()}${sufix}`;
  }
  return date;
};
const dirToHTMLList = (dir, url) => {
  let result = '';

  fs.readdirSync(dir).forEach((file) => {
    result += `<li><a href="${url + file}">/${file}</a> <span>${intToJSONDate(file, ' [', ']')}</span></li>`;
  });

  return `<h1>Directory: ${url}</h1>
  <ul>
    <li><a href="${url}..">/..</a></li>
    ${result}
  </ul>`;
};
const loadJSON = (file) => {
  try {
    const data = fs.readFileSync(file, 'utf8');

    return JSON.parse(data.toString());
  } catch (e) {
    logger.log('Error:', e.stack);
  }

  return null;
};
const getWorkDirs = (dirBase) => {
  const dirName = Date.now();
  return {
    DIR_NAME: dirName,
    DIR_BASE: `${dirBase}/${dirName}`,
    DIR_RESULT: `${dirBase}/${dirName}/result`,
    DIR_REPORT: `${dirBase}/${dirName}/report`,
  };
};
const searchInvalidCommand = (c) => {
  return typeof c !== typeof '' || c.trim().length === 0;
};
const prepareCommand = (cmd, config) => {
  let result = cmd;

  Object.keys(config).forEach((k) => {
    result = result.replace(new RegExp(`{${k}}`, 'gi'), config[k]);
  });

  return result;
};
const executeCommand = async (command, verbose) => new Promise((resolve) => {
  const proc = exec(command, (error, stdout, stderr) => resolve({ error, stdout, stderr }));
  if (verbose) {
    proc.stdout.on('data', logger.log);
    proc.stderr.on('data', logger.error);
    // proc.on('exit', (code) => rejects);
  }
});

module.exports = {
  intToJSONDate,
  dirToHTMLList,
  loadJSON,
  getWorkDirs,
  searchInvalidCommand,
  prepareCommand,
  executeCommand,
};

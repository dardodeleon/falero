const path = require('path');
const argv = require('./lib/argv');

const serve = require('./lib/serve');
const runner = require('./lib/runner');

const CONF_FILE = path.join(__dirname, 'config.json');
const DIR_RUNNER = path.join(__dirname, 'runner');
const MSG_SEPARATOR = '-'.repeat(60);

const args = argv(process.argv);

const server = typeof args.s === typeof '';
const verbose = typeof args.v === typeof '';

if (server) {
  serve(args.s, DIR_RUNNER);
} else {
  runner({
    CONF_FILE,
    DIR_RUNNER,
    MSG_SEPARATOR,
  }, verbose);
}

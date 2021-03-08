/* eslint-disable no-undef */
const assert = require('assert');
const args = require('../lib/argv');

describe('Test argv.js', () => {
  it('Verifica sin argumentos', () => {
    const actual = args([]);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });

  it('Verifica argumentos inválidos', () => {
    const actual = args([
      's', 't', 'v',
    ]);
    const expected = {};
    assert.deepStrictEqual(actual, expected);
  });

  it('Verifica argumentos válidos simples', () => {
    const actual = args([
      '-s', '-t', '-v',
    ]);
    const expected = {
      s: 's', t: 't', v: 'v',
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('Verifica argumentos válidos simples y con valores', () => {
    const actual = args([
      '-s=8080', '-t', '-v=A',
    ]);
    const expected = {
      s: '8080', t: 't', v: 'A',
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('Verifica argumentos válidos simple, con valores e inválidos', () => {
    const actual = args([
      '-t', 'invalid', '-s=8080',
    ]);
    const expected = {
      s: '8080', t: 't',
    };
    assert.deepStrictEqual(actual, expected);
  });

  it('Verifica argumentos inválidos por contener dos signos de igual', () => {
    const actual = args([
      '-a', '-t', '-s==8080', '-n=Hello', '-w', '-z=Foo=bar',
    ]);
    const expected = {
      a: 'a', t: 't', n: 'Hello', w: 'w',
    };
    assert.deepStrictEqual(actual, expected);
  });
});

describe('Test response.js', () => {
  it('ok(dir, res, msg, opts)');
  it('notFound(dir, res, msg)');
  it('internalError(dir, res, msg)');
  it('stream(file, res, size)');
});

describe('Test runner.js', () => {
  it('runner(cnf, testing, verbose)')
});

describe('Test serve.js', () => {
  it('serve(prt, dirBase)');
});

describe('Test system.js', () => {
  it('intToJSONDate (time, prefix, sufix)');
  it('dirToHTMLList (dir, url)');
  it('loadJSON (file)');
  it('getWorkDirs (dirBase)');
  it('prepareCommand (cmd, config)');
  it('executeCommand async (command, verbose)');
});

const system = require('./system');
const logger = require('./logger');

module.exports = async (cnf, testing, verbose) => {
  const {
    CONF_FILE,
    DIR_RUNNER,
    MSG_SEPARATOR,
  } = cnf;

  logger.log('\n Simple command runner and file server');

  const commands = system.loadJSON(CONF_FILE);

  if (!Array.isArray(commands) || commands.length === 0) {
    logger.error(`\nEl archivo de configuración(${CONF_FILE}) debe almacenar un array de comandos en formato cadena de texto.\n`); 
    process.exit(1);
  }

  const invalid = commands.filter(system.searchInvalidCommand);

  if (invalid.length > 0) {
    logger.error(`\nEl archivo de configuración(${CONF_FILE}) posee comandos invalidos, solo se permiten cadenas de texto.\n`);
    logger.table(invalid);
    process.exit(1);
  }

  const directories = system.getWorkDirs(DIR_RUNNER);

  // eslint-disable-next-line no-restricted-syntax
  for (const cmd of commands) {
    const command = system.prepareCommand(cmd, directories);

    logger.log(`\n${MSG_SEPARATOR}\n$> ${command}`);

    // eslint-disable-next-line no-await-in-loop
    const result = await system.executeCommand(command, verbose);

    logger.log(`# Return code: ${(result.error) ? result.error.code : '0'}`);
  }
};

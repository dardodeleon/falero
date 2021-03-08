module.exports = (args) => {
  const result = {};

  args.forEach((arg) => {
    if (arg.startsWith('-')) {
      const [key, value, ...rest] = arg.slice(1).split('=');
      if (rest.length === 0) {
        result[key] = (value !== undefined) ? value : key;
      }
    }
  });

  return result;
};

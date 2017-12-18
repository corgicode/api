const getEnv = (name, value) => {
  if (process.env[name]) {
    return process.env[name];
  }
  return value;
};

module.exports = {
  getEnv,
};

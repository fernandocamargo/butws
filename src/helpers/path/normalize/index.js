const {
  compilerOptions: { baseUrl },
} = require('@jsconfig');
const { relative, resolve } = require('path');
const { cwd } = require('process');

module.exports = filename => relative(resolve(cwd(), baseUrl), filename);

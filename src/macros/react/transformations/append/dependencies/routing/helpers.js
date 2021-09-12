const sortBy = require('lodash/sortBy');
const { AT, BRACKETS, LENGTH } = require('./constants');

const sanitize = (path) => path.replace(BRACKETS, '').replace(AT, ':');

const sort = (collection) => sortBy(collection, LENGTH);

module.exports = { sanitize, sort };

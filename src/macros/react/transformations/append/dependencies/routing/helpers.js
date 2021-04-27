const sortBy = require('lodash/sortBy');

const sort = collection => sortBy(collection, ['valueOf', 'length']);

module.exports = { sort };

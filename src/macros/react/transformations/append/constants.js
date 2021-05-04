const MAGIC = '*+?!{}[]()|@'.split('');

const SAFE_SPECIAL_CHARS = '\\$&';

const SPECIAL_CHARS = new RegExp(`[\\${MAGIC.join('\\')}]`, 'gi');

module.exports = { MAGIC, SAFE_SPECIAL_CHARS, SPECIAL_CHARS };

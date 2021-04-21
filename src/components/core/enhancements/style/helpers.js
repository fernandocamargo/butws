import slugify from 'slugify';

export const normalize = string =>
  String(string)
    .trim()
    .toLowerCase()
    .split('/')
    .map(slugify)
    .join('--');

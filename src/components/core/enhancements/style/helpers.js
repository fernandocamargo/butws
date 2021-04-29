import { sep } from 'path';
import slugify from 'slugify';

export const normalize = namespace =>
  namespace
    .split(sep)
    .splice(1)
    .slice(0, -1)
    .map(slugify)
    .join('--');

import { forwardRef } from 'react';

import * as statics from './statics';
import render from './render';

export default Object.assign(forwardRef(render), statics);

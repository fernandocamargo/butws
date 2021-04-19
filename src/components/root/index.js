// import React from '@macros/react/macro';

import React from 'react';
import { ThemeProvider as Theming } from 'styled-components';

import { App, Style } from 'components';
import theme from 'themes';

export default () => (
  <Theming theme={theme}>
    <Style />
    <App name="Born under the wrong star" />
  </Theming>
);

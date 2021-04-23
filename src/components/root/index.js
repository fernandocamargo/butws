import React from '@macros/react/macro';
import { BrowserRouter as Router } from 'react-router-dom';

import { App, Style, Theming } from 'components';
import theme from 'themes';

export default () => (
  <Router>
    <Theming theme={theme}>
      <Style />
      <App name="Born under the wrong star" />
    </Theming>
  </Router>
);

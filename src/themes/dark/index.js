import extend from 'lodash/merge';

import { getDefaultTheme } from 'helpers/theming';

export default extend(getDefaultTheme(), {
  background: '#282c34',
  color: '#fff',
});

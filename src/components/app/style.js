import property from 'lodash/property';
import { css } from 'styled-components';

export default css`
  background-color: #ccc;
  border: dotted 1px #000;
  color: ${property('theme.color')};
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem;
`;

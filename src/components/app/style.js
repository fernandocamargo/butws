import property from 'lodash/property';
import { css } from 'styled-components';

export default css`
  background-color: #ccc;
  border: dotted 1px #000;
  color: ${property('theme.color')};
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem;

  blockquote {
    background-color: #eaeaea;
    box-shadow: 3px 3px 5px 6px rgba(0, 0, 0, 0.05);
    margin: 1rem;
    padding: 1rem;
  }
`;

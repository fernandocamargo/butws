import property from 'lodash/property';
import { css } from 'styled-components';

export const color = 'purple';

export const getBorderRadius = () => '1rem';

export const second = () => css`
  font-size: 1rem;
  opacity: ${property('theme.opacity')};
`;

export const first = css`
  background-color: ${property('theme.background')};
  border-radius: ${getBorderRadius()};
  ${second};
`;

export default css`
  border: dotted 1rem red;
  color: ${property('theme.color')};
  margin: 1rem;
  padding: 1rem;
  ${first};
`;

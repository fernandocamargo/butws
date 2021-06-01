import React from '@macros/react/macro';

export default ({ routing: { current } = { current: 'Fake' }, className }) => (
  <div className={className}>
    <h1>This is us</h1>
    {!!current && <blockquote>{current}</blockquote>}
  </div>
);

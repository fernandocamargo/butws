import React from '@macros/react/macro';

export default ({ className, name }) => (
  <div className={className}>
    <p>Lorem ipsum</p>
    <dl>
      <dt>Name</dt>
      <dd>{name}</dd>
    </dl>
  </div>
);

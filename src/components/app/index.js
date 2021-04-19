import React from '@macros/react/macro';

export default ({ className, name, version }) => (
  <div className={className}>
    <p>Lorem ipsum</p>
    <dl>
      <dt>Name</dt>
      <dd>{name}</dd>
    </dl>
    <dl>
      <dt>Version</dt>
      <dd>v.{version}</dd>
    </dl>
  </div>
);

import React from '@macros/react/macro';

import { Button } from 'components/widgets';

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
    <Button>Click to do something</Button>
    <p>All rights reserved</p>
    <Button>Click to do something else</Button>
  </div>
);

import React from '@macros/react/macro';

import { Button } from 'components/widgets';

import Avatar from './avatar';

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
    <hr />
    <Button>Click to do something</Button>
    <hr />
    <Avatar />
    <p>All rights reserved</p>
  </div>
);

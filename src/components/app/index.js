import React from '@macros/react/macro';
import { Fragment } from 'react';

import { Button } from 'components/widgets';

import Avatar from './avatar';

export default ({ routing: { routes }, className, name, version }) => (
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
    {!!routes && (
      <Fragment>
        <hr />
        <h2>Routes</h2>
        <blockquote>{routes}</blockquote>
      </Fragment>
    )}
    <hr />
    <p>All rights reserved</p>
  </div>
);

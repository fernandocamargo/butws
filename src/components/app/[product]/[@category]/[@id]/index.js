import React from 'react';

export default ({
  routing: {
    params: { id },
  },
}) => <h1>Product #{id}</h1>;

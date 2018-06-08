import React, { Fragment } from 'react';

const ApplicationShell = ({ children }) => (
  <Fragment>
    <header />
    {children}
    <footer />
  </Fragment>
);

export default ApplicationShell;

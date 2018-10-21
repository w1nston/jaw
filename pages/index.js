import React, { Fragment } from 'react';
import { css } from 'react-emotion';

const headerStyle = css`
  font-size: 1.9rem;
`;

const HomePage = () => (
  <Fragment>
    <h1 className={headerStyle}>Home</h1>
  </Fragment>
);

export default HomePage;

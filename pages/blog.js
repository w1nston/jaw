import React, { Fragment } from 'react';
import { css } from 'react-emotion';

const headerStyle = css`
  font-size: 1.9rem;
`;

const Blog = () => (
  <Fragment>
    <h1 className={headerStyle}>Blog</h1>
  </Fragment>
);

export default Blog;

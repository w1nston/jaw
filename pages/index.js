import React from 'react';
import { css } from 'react-emotion';

const headerStyle = css`
  font-size: 1.9rem;
`;

const HomePage = () => (
  <section>
    <h1 data-testid="homePage-title-h1" className={headerStyle}>
      Home
    </h1>
  </section>
);

export default HomePage;

import React from 'react';
import { css } from 'emotion';

const headerStyle = css`
  margin-top: 2.625rem;
  padding: 0 0.875rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 2.625rem;
    max-width: 42.5rem;
  }
`;

const headerTitleStyle = css`
  color: #385f71;
  font-size: 1.8rem;
  margin-bottom: 0;

  @media (min-width: 768px) {
    padding 0 .875rem;
  }
`;

const headerSeparatorStyle = css`
  margin-top: 0;
`;

const mainStyle = css`
  padding: 0 0.875rem;
`;

const ApplicationShell = ({ children }) => (
  <section>
    <header className={headerStyle}>
      <h1 className={headerTitleStyle}>Jonas Amsen-Wallander</h1>
      <hr className={headerSeparatorStyle} />
    </header>
    <main className={mainStyle} role="main">
      {children}
    </main>
  </section>
);

export default ApplicationShell;

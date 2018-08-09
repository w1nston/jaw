import React from 'react';
import { css } from 'emotion';

const headerStyle = css`
  margin-top: 2.625rem;
  padding: 0 0.875rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 2.625rem;
    width: 62.5rem;
  }
`;

const headerTitleStyle = css`
  color: #385f71;
  font-size: 1.625rem;
  margin: 0 auto;
  margin-bottom: 0;
  width: 19.875rem;

  @media (min-width: 768px) {
    width: 21.625rem;
  }
`;

const headerSeparatorStyle = css`
  margin-top: 0;
`;

const ApplicationShell = ({ children }) => (
  <section>
    <header className={headerStyle}>
      <h1 className={headerTitleStyle}>Jonas Amsen-Wallander</h1>
      <hr className={headerSeparatorStyle} />
    </header>
    {children}
  </section>
);

export default ApplicationShell;

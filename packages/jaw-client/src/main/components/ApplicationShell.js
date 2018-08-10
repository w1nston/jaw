import React from 'react';
import { css } from 'emotion';

const headerStyle = css`
  margin-top: 2.1rem;
  padding: 0 0.7rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 2.1rem;
    width: 50rem;
  }
`;

const headerTitleStyle = css`
  color: #385f71;
  font-size: 1.3rem;
  margin: 0 auto;
  margin-bottom: 0;
  width: 15.9rem;

  @media (min-width: 768px) {
    width: 17.3rem;
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

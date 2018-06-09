import React from 'react';
import { css } from 'emotion';

const headerStyle = css`
  align-items: center;
  background-color: #247ba0;
  color: #fffcff;
  display: flex;
  height: 4.75rem;
  justify-content: center;
  width: 100%;
`;

const ApplicationShell = ({ children }) => (
  <section>
    <header className={headerStyle}>
      <span>
        jonas<b>AmsenWallander</b>
      </span>
    </header>
    {children}
  </section>
);

export default ApplicationShell;

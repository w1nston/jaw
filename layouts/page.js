import React from 'react';
import { css, cx } from 'react-emotion';

const containerStyle = css`
  padding: 0.5rem 0.8rem;
`;

const mainContentStyle = css`
  @media (min-width: 768px) {
    margin: 0 auto;
    width: 33rem;
  }
`;

const Page = ({ children, className }) => (
  <section className={cx(className, containerStyle)}>
    <main role="main" className={mainContentStyle}>
      {children}
    </main>
  </section>
);

export default Page;

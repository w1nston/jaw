import React from 'react';
import { css, cx } from 'react-emotion';
import Header from '../components/header/Header';

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
    <Header />
    <main role="main" className={mainContentStyle}>
      {children}
    </main>
  </section>
);

export default Page;

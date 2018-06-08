import React from 'react';
import { Link, Router } from '@reach/router';
import { css } from 'emotion';
import ApplicationShell from './ApplicationShell';
import About from '../../pages/about/components/About';
import Home from '../../pages/home/components/Home';

const navStyle = css`
  align-items: center;
  display: flex;
  height: 3.125rem;
  justify-content: space-around;
`;

const mainStyle = css`
  padding: .625rem 1.25rem;
`;

const App = () => (
  <ApplicationShell>
    <nav className={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <main className={mainStyle} role="main">
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </main>
  </ApplicationShell>
);

export default App;

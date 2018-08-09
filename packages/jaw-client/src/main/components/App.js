import React from 'react';
import { Router, Link } from '@reach/router';
import { css } from 'emotion';
import ApplicationShell from './ApplicationShell';
import Home from '../../pages/home';
import Projects from '../../pages/projects';

const navStyle = css`
  display: flex;
  justify-content: space-around;
  font-size: 1.5rem;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin: 0 auto;
    max-width: 42.5rem;
  }
`;

const mainStyle = css`
  padding: 0 0.875rem;

  @media (min-width: 768px) {
    margin: 0 auto;
    margin-top: 2.625rem;
  }
`;

const App = () => (
  <ApplicationShell>
    <nav className={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
    </nav>
    <main className={mainStyle} role="main">
      <Router>
        <Home path="/" />
        <Projects path="/projects" />
      </Router>
    </main>
  </ApplicationShell>
);

export default App;

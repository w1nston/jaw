import React from 'react';
import { Link, Router } from '@reach/router';
import { css } from 'emotion';
import ApplicationShell from './ApplicationShell';
import Home from '../../pages/home/components/Home';
import Projects from '../../pages/projects/components/Projects';

const navStyle = css`
  align-items: center;
  display: flex;
  height: 3.125rem;
  justify-content: space-around;
`;

const mainStyle = css`
  padding: 0.625rem 1.25rem;
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

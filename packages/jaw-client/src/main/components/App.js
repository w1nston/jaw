import React from 'react';
import { Router, Link } from '@reach/router';
import { css } from 'emotion';
import ApplicationShell from './ApplicationShell';
import Home from '../../pages/home';
import Projects from '../../pages/projects';

const navStyle = css`
  display: flex;
  justify-content: space-around;
`;

const App = () => (
  <ApplicationShell>
    <nav className={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
    </nav>
    <Router>
      <Home path="/" />
      <Projects path="/projects" />
    </Router>
  </ApplicationShell>
);

export default App;

import React from 'react';
import { Link, Router } from '@reach/router';
import ApplicationShell from './ApplicationShell';
import About from '../../pages/about/components/About';
import Home from '../../pages/home/components/Home';

const App = () => (
  <ApplicationShell>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <main role="main">
      <Router>
        <Home path="/" />
        <About path="/about" />
      </Router>
    </main>
  </ApplicationShell>
);

export default App;

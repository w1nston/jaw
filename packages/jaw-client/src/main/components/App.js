import React from 'react';
import { Router } from '@reach/router';
import ApplicationShell from './ApplicationShell';
import Home from '../../pages/home';

const App = () => (
  <ApplicationShell>
    <Router>
      <Home path="/" />
    </Router>
  </ApplicationShell>
);

export default App;

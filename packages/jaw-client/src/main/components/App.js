import React from 'react';
import { Link, Router } from '@reach/router';
import { css } from 'emotion';
import Loadable from 'react-loadable';
import ApplicationShell from './ApplicationShell';
import Home from '../../pages/home/components/Home';



const mainStyle = css`
  padding: 0.625rem 1.25rem;
`;

/*
const navStyle = css`
  align-items: center;
  display: flex;
  height: 3.125rem;
  justify-content: space-around;
`;

const createLoadableComponent = loaderFn => Loadable({
  loader: loaderFn,
  loading: Loading,
});

const Loading = () => <p>Loading...</p>;
const Projects = Loadable({
  loader: () => import('../../pages/projects/containers/ProjectsContainer'),
  loading: Loading,
});

TODO
<nav className={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
    </nav>


        <Projects path="/projects" />
*/
const App = () => (
  <ApplicationShell>
    <main className={mainStyle} role="main">
      <Router>
        <Home path="/" />
      </Router>
    </main>
  </ApplicationShell>
);

export default App;

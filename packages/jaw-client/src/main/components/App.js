import React from 'react';
import { Router } from '@reach/router';
import { css } from 'emotion';
import ApplicationShell from './ApplicationShell';
import Home from '../../pages/home/components/Home';

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

// TODO: For project> create GraphQL API with https://punkapi.com/documentation/v2
// IDEA: fetch all beers, to find all food. Then present food first and suggest beer....

TODO
<nav className={navStyle}>
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
    </nav>


        <Projects path="/projects" />
*/
const App = () => (
  <ApplicationShell>
    <Router>
      <Home path="/" />
    </Router>
  </ApplicationShell>
);

export default App;

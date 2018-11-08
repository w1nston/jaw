import React from 'react';
import { css } from 'react-emotion';
import ProjectList from '../components/project-list/ProjectList';

const projectData = [
  {
    link: 'https://upsndowns.amsenwallander.se',
    title: 'Snakes and ladders',
    description: [
      'An implementation of the old board game Snakes and ladders.',
      'It is implemented as a Markov chain, using a transition matrix to generate a probability distribution from which to generate the players moves.',
    ],
    sourceCodeLocations: ['https://github.com/w1nston/upsndowns'],
  },
  {
    link: 'https://punk-food.amsenwallander.se',
    title: 'Punk Food',
    description: [
      'List of dishes, with a link to Google search for a recipe, and suggestion of what beer goes well with the dish.',
      'The data is served from a GraphQL API hosted on Heroku, so it will take some time to load the initial data if no request has been made in a while.',
    ],
    sourceCodeLocations: [
      'https://github.com/w1nston/punk-client',
      'https://github.com/w1nston/punk-server',
    ],
  },
];

const headerStyle = css`
  font-size: 1.9rem;
  margin-bottom: 4.5rem;
`;

const Projects = ({ projects }) => {
  return (
    <section>
      <h1 className={headerStyle}>Projects</h1>
      <ProjectList projects={projects} />
    </section>
  );
};

Projects.getInitialProps = async () => ({ projects: projectData });

export default Projects;

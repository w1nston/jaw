import { withProps } from 'recompose';
import Projects from '../components/Projects';

const projects = [
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

export default withProps({ projects })(Projects);

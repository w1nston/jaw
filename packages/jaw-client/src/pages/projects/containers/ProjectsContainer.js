import { withProps } from 'recompose';
import Projects from '../components/Projects';

const projects = [
  {
    path: '/',
    title: '',
    description: '',
  },
];

export default withProps({ projects })(Projects);

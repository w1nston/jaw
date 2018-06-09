import { withProps } from 'recompose';
import Projects from '../components/Projects';

const projects = [
  {
    path: '/react-rally-2018',
    title: 'React Rally 2018 Schedule',
    description:
      'Simple application to display the speakers and schedule of React Rally 2018',
  },
];

export default withProps({ projects })(Projects);

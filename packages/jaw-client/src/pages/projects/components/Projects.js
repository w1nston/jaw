import React from 'react';
import { Link } from '@reach/router';

const Projects = () => (
  <table>
    <thead>
      <tr>
        <th>Project</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><Link to="react-rally-2018">React Rally 2018</Link></td>
        <td>Implementation of the schema over React Rally 2018</td>
      </tr>
    </tbody>
  </table>
);

export default Projects;

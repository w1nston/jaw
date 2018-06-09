import React from 'react';
import { Link } from '@reach/router';
import { css } from 'emotion';

const tableStyle = css`
  width: 100%;
`;

const DesktopTable = ({ projects }) => (
  <table className={tableStyle}>
    <thead>
      <tr>
        <th align="left">Project</th>
        <th align="left">Description</th>
        <th align="left">Demo</th>
      </tr>
    </thead>
    <tbody>
      {projects &&
        projects.map(({ path, title, description }, index) => (
          <tr key={index}>
            <td>{title}</td>
            <td>{description}</td>
            <td>
              <Link to={path}>GoTo</Link>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default DesktopTable;

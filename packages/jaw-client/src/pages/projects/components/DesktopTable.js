import React from 'react';
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
        <th align="left">Source code</th>
      </tr>
    </thead>
    <tbody>
      {projects &&
        projects.map(({ link, title, description }, index) => (
          <tr key={index}>
            <td>{title}</td>
            <td>{description}</td>
            <td>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Live demo
              </a>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default DesktopTable;

import React, { Fragment } from 'react';
import { Link } from '@reach/router';

const MobileTable = ({ projects }) => (
  <table>
    <thead />
    <tbody>
      {projects &&
        projects.map(({ path, title, description }, index) => (
          <Fragment key={index}>
            <tr>
              <td>
                <strong>Project:</strong>
              </td>
              <td>{title}</td>
            </tr>
            <tr>
              <td>
                <strong>Demo:</strong>
              </td>
              <td>
                <Link to={path}>GoTo</Link>
              </td>
            </tr>
            <tr key={index}>
              <td>
                <strong>Description:</strong>
              </td>
              <td>{description}</td>
            </tr>
          </Fragment>
        ))}
    </tbody>
  </table>
);

export default MobileTable;

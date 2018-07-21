import React, { Fragment } from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';

const tableStyle = css`
  border-collapse: collapse;
`;

const tableColumnStyle = css`
  padding: 0.5rem 0;
`;

// rgba(242, 246, 208, 0.2)

const MobileTable = ({ projects }) => (
  <table className={tableStyle}>
    <thead />
    <tbody>
      {projects &&
        projects.map(({ link, title, description, sourceCodeLocations }) => (
          <Fragment key={uuid()}>
            <tr>
              <td className={tableColumnStyle}>
                <strong>Project:</strong>
              </td>
              <td className={tableColumnStyle}>{title}</td>
            </tr>
            <tr>
              <td colSpan={2} className={tableColumnStyle}>
                <strong>Description:</strong>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className={tableColumnStyle}>
                {description.map(desc => <p>{desc}</p>)}
              </td>
            </tr>
            <tr>
              <td className={tableColumnStyle}>
                <strong>Live demo:</strong>
              </td>
              <td className={tableColumnStyle}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  Here!
                </a>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className={tableColumnStyle}>
                <strong>Source code:</strong>
              </td>
            </tr>
            {sourceCodeLocations.map(sourceCodeLink => (
              <tr key={uuid()}>
                <td colSpan={2} className={tableColumnStyle}>
                  <a
                    href={sourceCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sourceCodeLink}
                  </a>
                </td>
              </tr>
            ))}
          </Fragment>
        ))}
    </tbody>
  </table>
);

export default MobileTable;

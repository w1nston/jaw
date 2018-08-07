import React from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';

const tableStyle = css`
  border-collapse: collapse;
`;

const tableRowStyle = css`
  vertical-align: top;

  &:nth-child(even) {
    background-color: rgba(242, 246, 208, 0.2);
  }
`;

const tableTitleCellStyle = css`
  padding: 1rem 0;
  width: 12%;
`;

const tableDescriptionCellStyle = css`
  width: 45%;
`;

const tableLiveDemoCellStyle = css`
  padding: 1rem 0;
  width: 10%;
`;

const DesktopTable = ({ projects }) => (
  <table className={tableStyle}>
    <thead>
      <tr>
        <th align="left">Project</th>
        <th align="left">Description</th>
        <th align="left">Live demo</th>
        <th align="left">Source code</th>
      </tr>
    </thead>
    <tbody>
      {projects &&
        projects.map(({ link, title, description, sourceCodeLocations }) => (
          <tr key={uuid()} className={tableRowStyle}>
            <td className={tableTitleCellStyle}>{title}</td>
            <td className={tableDescriptionCellStyle}>
              {description.map(desc => <p key={uuid()}>{desc}</p>)}
            </td>
            <td className={tableLiveDemoCellStyle}>
              <a href={link}>
                Here!
              </a>
            </td>
            <td>
              {sourceCodeLocations.map(sourceCodeLink => (
                <p key={uuid()}>
                  <a
                    href={sourceCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sourceCodeLink}
                  </a>
                </p>
              ))}
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default DesktopTable;

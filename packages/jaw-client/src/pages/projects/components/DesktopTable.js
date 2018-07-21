import React from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';

const tableStyle = css`
  border-collapse: collapse;
`;

const tableRowStyle = css`
  vertical-align: top;
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

const tableSourceCodeLinkCellStyle = css`
  padding: 1rem 0;
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
              {description.map(desc => <p>{desc}</p>)}
            </td>
            <td className={tableLiveDemoCellStyle}>
              <a href={link} target="_blank" rel="noopener noreferrer">
                Here!
              </a>
            </td>
            <td>
              {sourceCodeLocations.map(sourceCodeLink => (
                <tr key={uuid()}>
                  <td className={tableSourceCodeLinkCellStyle}>
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
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default DesktopTable;

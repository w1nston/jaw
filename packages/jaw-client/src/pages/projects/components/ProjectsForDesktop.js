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
  width: 15%;
`;

const tableDescriptionCellStyle = css`
  padding-right: 1.3rem;
  width: 50%;
`;

const sourceCodeLinkStyle = css`
  word-break: break-word;
`;

const ForDesktop = ({ projects }) => (
  <table className={tableStyle}>
    <thead>
      <tr>
        <th align="left">Project</th>
        <th align="left">Description</th>
        <th align="left">Source code</th>
      </tr>
    </thead>
    <tbody>
      {projects &&
        projects.map(({ link, title, description, sourceCodeLocations }) => (
          <tr key={uuid()} className={tableRowStyle}>
            <td className={tableTitleCellStyle}>
              <p>{title}</p>
              <p>
                <a href={link}>Live demo</a>
              </p>
            </td>
            <td className={tableDescriptionCellStyle}>
              {description.map(desc => <p key={uuid()}>{desc}</p>)}
            </td>
            <td>
              {sourceCodeLocations.map(sourceCodeLink => (
                <p key={uuid()}>
                  <a
                    className={sourceCodeLinkStyle}
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

export default ForDesktop;

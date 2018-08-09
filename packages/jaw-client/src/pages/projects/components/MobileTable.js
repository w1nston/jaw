import React, { Fragment } from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';

const articleStyle = css`
  margin: 6.25rem 0;

  &:first-of-type {
    margin-top: 4.125rem;
  }

  &:nth-child(odd) {
    background-color: rgba(242, 246, 208, 0.2);
  }
`;

const liveDemoLinkStyle = css`
  font-size: 1.5rem;
`;

const sourceCodeLinkStyle = css`
  word-break: break-word;
`;

const titleHeaderStyle = css`
  margin-bottom: 2.125rem
`;

const smallHeaderStyle = css`
  margin: 2.75rem 0;
`;

const MobileTable = ({ projects }) => (
  <Fragment>
    {projects &&
      projects.map(({ link, title, description, sourceCodeLocations }) => (
        <article className={articleStyle} key={uuid()}>
          <h2 className={titleHeaderStyle}>{title}</h2>
          <a className={liveDemoLinkStyle} href={link}>
            Live demo
          </a>
          <h3 className={smallHeaderStyle}>Description</h3>
          {description.map(desc => <p key={uuid()}>{desc}</p>)}
          <h3 className={smallHeaderStyle}>Source code</h3>
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
        </article>
      ))}
  </Fragment>
);

export default MobileTable;

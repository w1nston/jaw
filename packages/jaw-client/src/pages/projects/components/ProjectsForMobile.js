import React, { Fragment } from 'react';
import { css } from 'emotion';
import uuid from 'uuidv4';

const articleStyle = css`
  margin-bottom: 5rem;

  &:first-of-type {
    margin-top: 3rem;
  }
`;

const liveDemoLinkStyle = css`
  font-size: 1.2rem;
`;

const sourceCodeLinkStyle = css`
  word-break: break-word;
`;

const projectTitleStyle = css`
  margin-bottom: 2rem;
`;

const descriptionTitleStyle = css`
  margin-bottom: 2rem;
`;

const descriptionStyle = css`
  margin: 2rem 0;
`;

const ForMobile = ({ projects }) => (
  <Fragment>
    {projects &&
      projects.map(({ link, title, description, sourceCodeLocations }) => (
        <article className={articleStyle} key={uuid()}>
          <h2 className={projectTitleStyle}>{title}</h2>
          <a className={liveDemoLinkStyle} href={link}>
            Live demo
          </a>
          <h3 className={descriptionTitleStyle}>Description</h3>
          {description.map(desc => <p className={descriptionStyle} key={uuid()}>{desc}</p>)}
          <h3>Source code</h3>
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

export default ForMobile;

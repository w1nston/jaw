import React from 'react';
import { css } from 'react-emotion';
import uuid from 'uuidv4';

const articleStyle = css`
  margin-bottom: 4rem;
`;

const sourceCodeListStyle = css`
  list-style-type: none;
  padding-left: 0;
  word-break: break-word;
`;

const Project = ({ description, link, sourceCodeLocations, title }) => (
  <article className={articleStyle}>
    <h2 data-testid="projects-projectTitle-h2">{title}</h2>
    <a href={link}>Live demo</a>
    <div data-testid="projects-description-div">
      {description.map(section => (
        <p key={uuid()}>{section}</p>
      ))}
    </div>
    <h3 data-testid="projects-sourceCodeTitle-h3">Source</h3>
    <ul data-testid="projects-sourceCodeList-ul" className={sourceCodeListStyle}>
      {sourceCodeLocations.map(source => (
        <li key={source}>
          <a href={source}>{source}</a>
        </li>
      ))}
    </ul>
  </article>
);

export default Project;

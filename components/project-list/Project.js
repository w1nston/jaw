import React from 'react';
import { css } from 'react-emotion';

const sourceCodeListStyle = css`
  list-style-type: none;
  padding-left: 0;
  word-break: break-word;
`;

const Project = ({ description, link, sourceCodeLocations, title }) => (
  <>
    <h2>{title}</h2>
    <a href={link}>Live demo</a>
    <p>{description}</p>
    <h3>Source</h3>
    <ul className={sourceCodeListStyle}>
      {sourceCodeLocations.map(source => (
        <li key={source}>
          <a href={source}>{source}</a>
        </li>
      ))}
    </ul>
  </>
);

export default Project;

import React from "react";
import { css } from "react-emotion";

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
    <h2>{title}</h2>
    <a href={link}>Live demo</a>
    {description.map(section => (
      <p>{section}</p>
    ))}
    <h3>Source</h3>
    <ul className={sourceCodeListStyle}>
      {sourceCodeLocations.map(source => (
        <li key={source}>
          <a href={source}>{source}</a>
        </li>
      ))}
    </ul>
  </article>
);

export default Project;

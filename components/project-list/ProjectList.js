import React from 'react';
import Project from './Project';
import uuid from 'uuidv4';

const ProjectList = ({ projects }) => (
  <>
    {projects.map(project => (
      <Project key={uuid()} {...project} />
    ))}
  </>
);

export default ProjectList;

import React from 'react';
import Project from './Project';

const ProjectList = ({ projects }) => (
  <>
    {projects.map(project => (
      <Project key={project.title} {...project} />
    ))}
  </>
);

export default ProjectList;

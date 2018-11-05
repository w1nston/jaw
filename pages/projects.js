import React from 'react';
import { css } from 'react-emotion';
import { useWindowSize } from '../hooks/windowHooks';

const headerStyle = css`
  font-size: 1.9rem;
`;

const ProjectHeading = () => <h1 className={headerStyle}>Projects</h1>;

const Projects = () => {
  const { width } = useWindowSize();

  if (width > TABLET) {
    // Desktop
    return (
      <>
        <ProjectHeading />
      </>
    );
  }

  if (width > MOBILE) {
    // Tablet
    return (
      <>
        <ProjectHeading />
      </>
    );
  }

  return (
    <>
      <ProjectHeading />
    </>
  );
};

export default Projects;

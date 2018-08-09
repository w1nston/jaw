import React from 'react';
import { css } from 'emotion';
import Responsive from '../../../common/components/Responsive';
import ForDesktop from './ProjectsForDesktop';
import ForMobile from './ProjectsForMobile';
import ForTablet from './ProjectsForTablet';

const projectsSectionStyle = css`
  padding-top: 2.5rem;

  @media (min-width: 768px) {
    margin: 20px auto;
    max-width: 62.5rem;
    padding-top: 1rem;
  }
`;

const Projects = ({ projects }) => (
  <section className={projectsSectionStyle}>
    <h1>Projects</h1>
    <Responsive>
      {width => {
        if (width > 991) {
          return <ForDesktop projects={projects} />;
        }

        if (width > 767) {
          return <ForTablet projects={projects} />;
        }

        return <ForMobile projects={projects} />;
      }}
    </Responsive>
  </section>
);

export default Projects;

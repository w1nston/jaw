import React from 'react';
import { css } from 'emotion';
import Responsive from '../../../common/components/Responsive';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';
import TabletTable from './TabletTable';

const projectsSectionStyle = css`
  @media (min-width: 768px) {
    margin: 20px auto;
    max-width: 62.5rem;
  }
`;

const Projects = ({ projects }) => (
  <section className={projectsSectionStyle}>
    <h1>Projects</h1>
    <Responsive>
      {width => {
        if (width > 991) {
          return <DesktopTable projects={projects} />;
        }

        if (width > 767) {
          return <TabletTable projects={projects} />;
        }

        return <MobileTable projects={projects} />;
      }}
    </Responsive>
  </section>
);

export default Projects;

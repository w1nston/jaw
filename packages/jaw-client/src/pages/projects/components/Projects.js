import React, { Fragment } from 'react';
import Responsive from '../../../common/components/Responsive';
import DesktopTable from './DesktopTable';
import MobileTable from './MobileTable';
import TabletTable from './TabletTable';

const Projects = ({ projects }) => (
  <Fragment>
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
  </Fragment>
);

export default Projects;

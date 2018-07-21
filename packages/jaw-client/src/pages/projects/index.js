import { createLoadableComponent } from '../../common/util/loadableComponentFactory';

export default createLoadableComponent(() => import('./containers/ProjectsContainer'));

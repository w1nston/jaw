import { createLoadableComponent } from '../../common/util/loadableComponentFactory';

export default createLoadableComponent(() => import('./components/Home'));

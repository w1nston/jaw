import { useEffect } from 'react';
import Prism from '~/libs/syntax-highlighting/prismjs/prism';

/**
 * Workaround for getting the syntax highlight to apply styles.
 */
export function usePrismHighlight() {
  useEffect(() => {
    setTimeout(() => {
      Prism.highlightAll();
    }, 0);
  }, []);
}

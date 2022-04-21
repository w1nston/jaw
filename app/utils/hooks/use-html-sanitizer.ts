import { useEffect, useState } from 'react';
import createDOMPurify from 'dompurify';


export function useHTMLSanitizer(rawText: string): string {
  let [cleanContent, setCleanContent] = useState<string>('');

  useEffect(() => {
    let DOMPurify = createDOMPurify(window);
    let _cleanContent = DOMPurify.sanitize(rawText);
    setCleanContent(_cleanContent);
  }, [rawText]);

  return cleanContent;
}
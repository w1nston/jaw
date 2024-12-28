export function initSyntaxHighlighting(delay: number = 10) {
  setTimeout(() => {
    //@ts-ignore
    Prism.highlightAll();
  }, delay);
}

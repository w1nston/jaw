import { marked } from 'marked';
import type { Thought, ThoughtMetadata } from '~/types/thoughts';

export function transformThoughts(entries: any): ThoughtMetadata[] {
  return entries.items.map((item: any) => {
    let { id, createdAt } = item.sys;
    let { title, abstract } = item.fields;

    return {
      id,
      title,
      abstract,
      publishedAt: createdAt,
    };
  });
}

export function transformThought(entry: any): Thought {
  let { content } = entry.fields;

  return {
    content: marked.parse(content),
  };
}

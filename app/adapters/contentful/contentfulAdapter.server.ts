// TODO: types
export function transformBlogPosts(entries) {
  return entries.items.map((item) => {
    let { id, createdAt } = item.sys;
    let { title, abstract } = item.fields;

    return {
      id,
      title,
      abstract,
      publishedAt: createdAt
    };
  });
}

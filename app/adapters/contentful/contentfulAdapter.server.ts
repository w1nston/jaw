// TODO: types
export function transformBlogPosts(entries) {
  return entries.items.map((item) => {
    let { id } = item.sys;
    let { title } = item.fields;

    return {
      id,
      title,
    };
  });
}

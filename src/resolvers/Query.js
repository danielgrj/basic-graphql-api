const Query = {
  users(
    parent,
    { query },
    {
      db: { users }
    },
    info
  ) {
    if (!query) return users;

    return users.filter(user => {
      return user.name.toLowerCase().includes(query.toLowerCase());
    });
  },
  posts(
    parent,
    { query },
    {
      db: { posts }
    },
    info
  ) {
    if (!query) return posts;

    return posts.filter(post => {
      const formattedQuery = query.toLowerCase().trim();
      return post.title.toLowerCase().includes(formattedQuery) || post.body.toLowerCase().includes(formattedQuery);
    });
  },
  comments(
    parent,
    { query },
    {
      db: { comments }
    },
    info
  ) {
    if (!query) return comments;
    return comments.filter(comment => comment.text.toLowerCase().includes(query.toLowerCase()));
  },
  me() {
    return {
      id: '123902',
      name: 'Daniel',
      email: 'daniel@example.com'
    };
  },
  post() {
    return {
      id: 'dasdas',
      title: 'Some title',
      body: 'Awesome body',
      published: false
    };
  }
};

export default Query;

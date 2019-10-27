import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser(parent, { data }, { db }, info) {
    const { name, email, age } = data;
    const isUserTaken = db.users.some(user => user.email === email);

    if (isUserTaken) throw new Error('Email is taken');

    const user = {
      id: uuidv4(),
      name,
      email,
      age
    };

    db.users.push(user);
    return user;
  },

  deleteUser(parent, { id }, { db }, info) {
    const userIndex = db.users.findIndex(user => user.id === id);

    if (userIndex === -1) throw new Error('User not found');

    const [deletedUser] = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === id;

      if (match) db.comments = db.comments.filter(comment => comment.post !== post.id);

      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== id);

    return deletedUser;
  },

  updateUser(parent, { id, data }, { db }, info) {
    const { name, email, age } = data;
    const user = db.users.find(user => user.id === id);

    if (!user) throw new Error('User not found');

    if (email) {
      const isEmailTaken = db.users.some(user => user.email === email);

      if (isEmailTaken) throw new Error('Email is already taken');

      user.email = email;
    }

    if (name) user.name = name;
    if (age !== undefined) user.age = age;

    return user;
  },

  createPost(parent, { data }, { db, pubsub }, info) {
    const { author, title, body, published } = data;
    const userExists = db.users.some(user => user.id === author);

    if (!userExists) throw new Error("User doesn't exist");

    const post = {
      id: uuidv4(),
      title,
      body,
      published,
      author
    };

    db.posts.push(post);
    if (post.published) pubsub.publish(`post`, { post });

    return post;
  },

  deletePost(args, { id }, { db }, info) {
    const postIndex = db.posts.findIndex(post => post.id === id);

    if (postIndex === -1) throw new Error('Post not found');

    const [deletedPost] = db.posts.splice(postIndex, 1);
    db.comments = db.comments.filter(comment => comment.post !== id);

    return deletedPost;
  },

  updatePost(args, { id, data }, { db }, info) {
    const { title, body, published } = data;
    const post = db.posts.find(post => post.id === id);

    if (!post) throw new Error('Post not found');

    for (const key in data) {
      post[key] = data[key];
    }

    return post;
  },

  createComment(parent, { data }, { db, pubsub }, info) {
    const { author, text, post } = data;
    const userExists = db.users.some(user => user.id === author);
    const postExists = db.posts.some(currentPost => currentPost.id === post && currentPost.published);

    if (!userExists || !postExists) throw new Error('Incorrect user or post');

    const comment = {
      id: uuidv4(),
      author,
      post,
      text
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${post}`, { comment });

    return comment;
  },

  deleteComment(parent, { id }, { db }, info) {
    const commentIndex = db.comments.findIndex(comment => comment.id === id);

    if (commentIndex === -1) throw new Error('Comment not found');

    return db.comments.splice(commentIndex, 1)[0];
  },

  updateComment(parent, { id, data }, { db }, info) {
    const { text } = data;
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) throw new Error('Comment not found');

    if (text) comment.text = text;

    return comment;
  }
};

export default Mutation;

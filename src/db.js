const users = [
  {
    id: '1',
    name: 'Daniel Garcia',
    email: 'example@example.com',
    age: 24
  },
  {
    id: '2',
    name: 'Mike',
    email: 'mike@example.com'
  },
  {
    id: '3',
    name: 'Raul',
    email: 'raul@example.com'
  }
];

const posts = [
  {
    id: '1',
    title: 'Pokemon annoucement',
    body: 'A new game was announced',
    published: false,
    author: '1'
  },
  {
    id: '2',
    title: 'Letal virus on the air',
    body: 'Everybody is in danger',
    published: false,
    author: '1'
  },
  {
    id: '3',
    title: "You won' belive anything",
    body: 'The sky is brown',
    published: true,
    author: '2'
  }
];

const comments = [
  {
    id: '1',
    text: 'This is horrible',
    author: '1',
    post: '1'
  },
  {
    id: '2',
    text: 'Ta chido',
    author: '3',
    post: '2'
  },
  {
    id: '3',
    text: 'This is great',
    author: '3',
    post: '3'
  }
];

const db = {
  users,
  posts,
  comments
};

export default db;

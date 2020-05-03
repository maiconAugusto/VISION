const Realm = require('realm');

class User {}
User.schema = {
  name: 'User',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    name: 'string',
    email: 'string',
    password: 'string',
    avatar: 'string',
  },
};

class Post {}
Post.schema = {
  name: 'Post',
  primaryKey: 'id',
  properties: {
    id: { type: 'int', indexed: true },
    post: 'string',
    like: { type: 'int', indexed: true },
  },
};

const realm = new Realm({ schema: [User, Post] });
export default realm;

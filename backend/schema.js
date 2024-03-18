const { buildSchema } = require('graphql')

const schema = buildSchema(`
  type Query {
    getPost(id: Int!): Post
    getRecentPostsWithLimit(limit: Int!): [Post]
    getPostsByTag(tagName: String!): [Post]
    getUser(id: Int!): User
    getUsers: [User]
    getComments(postId: Int!): [Comment]
    getTags: [Tag]
    getProject(id: Int!): Project
    getProjects: [Project]
  }

  type Mutation {
    createPost(input: PostInput): Post
    updatePost(id: Int!, input: PostInput): Post
    deletePost(id: Int!): String
    createUser(input: UserInput): User
    createComment(input: CommentInput): Comment
    createTag(name: String!): Tag
    favoritePost(userId: Int!, postId: Int!): User
    unfavoritePost(userId: Int!, postId: Int!): User
    createProject(input: ProjectInput): Project
    updateProject(id: Int!, input: ProjectInput): Project
    deleteProject(id: Int!): String
    favoriteProject(userId: Int!, projectId: Int!): User
    unfavoriteProject(userId: Int!, projectId: Int!): User
  }

  type Post {
    id: Int
    title: String
    content: String
    author: User
    tags: [Tag]
    comments: [Comment]
    favoritesCount: Int
    createdAt: String
    updatedAt: String
  }

  type Project {
    id: Int
    releaseDate: String
    name: String
    description: String
    sourceUrl: String
    demoUrl: String
    articleUrl: String
    favoritesCount: Int
    author: User
  }

  type User {
    id: Int
    name: String
    email: String
    posts: [Post]
    comments: [Comment]
    post_favorites: [Post_Favorite]
    project_favorites: [Project_Favorite]
    is_admin: Boolean
  }

  type Post_Favorite {
    id: Int
    user: User
    post: Post
    favorited_at: String
  }

  type Project_Favorite {
    id: Int
    user: User
    project: Project
    favorited_at: String
  }
  
  type Comment {
    id: Int
    content: String
    author: User
    post: Post
    createdAt: String
  }

  type co,, {
    id: Int
    name: String
    posts: [Post]
  }

  input PostInput {
    title: String!
    content: String!
    authorId: Int!
    tagIds: [Int!]
  }

  input ProjectInput {
    releaseDate: String!
    name: String!
    description: String!
    sourceUrl: String
    demoUrl: String
    articleUrl: String
    authorId: Int!
  }

  input UserInput {
    name: String!
    email: String!
  }

  input CommentInput {
    content: String!
    postId: Int!
    authorId: Int!
  }

  input TagInput {
    name: String!
  }
`);

module.exports = schema;
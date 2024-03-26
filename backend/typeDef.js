const typeDefs = `

type Query {
  getUser(id: Int!): User
  getRecentPosts(user_id: Int!): [Post]
  getHighlights: [Post]
  getHighlightedProjects: [Project]
  getAllPosts: [Post]
  getAllProjects: [Project]
  getBlogFromSlug(slug: String!): Post
}

type User {
  id: Int
  name: String
  email: String
}

type Post {
  id: Int
  title: String
  content: String
  author: User
  created_at: String
  updated_at: String
  is_highlight: Boolean
  icon: String
  slug: String
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
  is_hightlighted: Boolean
}
`

module.exports = typeDefs
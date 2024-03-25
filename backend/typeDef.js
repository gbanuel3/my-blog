const typeDefs = `

type Query {
  getUser(id: Int!): User
  getRecentPosts(user_id: Int!): [Post]
  getHighlights: [Post]
  getHighlightedProjects: [Project]
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
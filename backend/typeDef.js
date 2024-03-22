const typeDefs = `

type Query {
  getUser(id: Int!): User
  getRecentPosts(user_id: Int!): [Post]
  getHighlights: [Post]
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
`

module.exports = typeDefs
const pool = require('./db')

const resolvers = {
  Query: {
    // Fetch a user by id
    getUser: async (_, { id }) => {
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return rows[0] // Returns the first user matching the id or undefined
      } catch (error) {
        throw new Error('Failed to fetch user.')
      }
    },
    // Fetch the most recent post by a user
    getRecentPosts: async (_, { user_id }) => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM posts WHERE author_id = $1 ORDER BY created_at DESC LIMIT 6',
          [user_id],
        )
        return rows
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching recent posts.')
      }
    },
    getHighlights: async () => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM posts WHERE is_highlight = TRUE LIMIT 12',
        )
        return rows
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching highlights.')
      }
    },
  },
  Post: {
    author: async (post) => {
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE users.id = $1', [
          post.author_id,
        ])
        return rows[0] // Returns the first user matching the id or undefined
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching post author.')
      }
    },
  },
}

module.exports = resolvers

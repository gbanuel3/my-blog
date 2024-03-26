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
          'SELECT * FROM posts WHERE is_highlight = TRUE ORDER BY created_at LIMIT 12',
        )
        return rows
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching highlights.')
      }
    },
    getHighlightedProjects: async () => {
      try {
        const { rows } = await pool.query(
          'SELECT * FROM projects WHERE is_highlighted = TRUE  ORDER BY "releaseDate" LIMIT 6',
        )
        return rows
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching highlighted projects.')
      }
    },
    getAllPosts: async () => {
      try {
        const { rows } = await pool.query('SELECT * FROM posts ORDER BY created_at DESC')
        return rows
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching all posts.')
      }
    },
    getAllProjects: async () => {
      try {
        const { rows } = await pool.query('SELECT * FROM projects ORDER BY "releaseDate" DESC')
        return rows
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching all projects.')
      }
    },
    getBlogFromSlug: async (_, { slug }) => {
      try {
        const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1', [slug])
        return rows[0]
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching post by slug.')
      }
    },
  },
  Post: {
    author: async (post) => {
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE users.id = $1', [
          post.author_id,
        ])
        return rows[0]
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching post author.')
      }
    },
  },
  Project: {
    author: async (post) => {
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE users.id = $1', [
          post.author_id,
        ])
        return rows[0]
      } catch (error) {
        console.error(error)
        throw new Error('Error fetching post author.')
      }
    },
  },
}

module.exports = resolvers

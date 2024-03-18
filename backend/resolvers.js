const pool = require('./db')

const resolvers = {
  getUser: async (args) => {
    const { id } = args
    try {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
      return rows[0] // Returns the first user matching the id or undefined
    } catch (error) {
      throw new Error('Failed to fetch user.')
    }
  },
}

module.exports = resolvers

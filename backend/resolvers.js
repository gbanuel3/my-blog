const pool = require('./db')

const resolvers = {
  Query: {
    getUser: async (args) => {
      const { id } = args
      try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
        return rows[0]
      } catch (error) {
        throw new Error('Failed to fetch user.')
      }
    },
  }
  //   getRecentPosts: async (_, { user_id }) => {
  //     // Fetch the most recent post by a user
  //     try {
  //       const { rows } = await pool.query(
  //         'SELECT * FROM posts WHERE author_id = $1',
  //         [user_id]
  //       );
  //       return rows;
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error('Error fetching recent posts.');
  //     }
  //   },
  // },
  // Post: {
  //   // Resolver to fetch the author of the post
  //   author: async (post) => {
  //     try {
  //       const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [post.author_id]);
  //       return rows.length > 0 ? rows[0] : null;
  //     } catch (error) {
  //       console.error(error);
  //       throw new Error('Error fetching post author.');
  //     }
  //   },
  // },
};

module.exports = resolvers

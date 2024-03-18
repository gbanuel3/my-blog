const pool = require('./db')

const resolvers = {
  Query: {
    getUser: async (_, { id }) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
      return rows[0]
    },
    getPost: async (_, { id }) => {
      const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id])
      return rows[0]
    },
    getRecentPostsWithLimit: async (_, { limit }) => {
      const { rows } = await pool.query(
        'SELECT * FROM posts ORDER BY created_at DESC LIMIT $1',
        [limit],
      )
      return rows
    },
    getPostsByTag: async (_, { tagName }) => {
      const { rows } = await pool.query(
        `
        SELECT posts.* FROM posts
        JOIN tags ON posts.id = tags.post_id
        JOIN tags ON tags.id = tags.tag_id
        WHERE tags.name = $1
      `,
        [tagName],
      )
      return rows
    },
    getProject: async (_, { id }) => {
      const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [id])
      return rows[0]
    },
    getProjects: async () => {
      const { rows } = await pool.query('SELECT * FROM projects')
      return rows
    },
    getUsers: async () => {
      const { rows } = await pool.query('SELECT * FROM users')
      return rows
    },

    getComments: async (_, { postId }) => {
      const { rows } = await pool.query('SELECT * FROM comments WHERE post_id = $1', [
        postId,
      ])
      return rows
    },

    getTags: async () => {
      const { rows } = await pool.query('SELECT * FROM tags')
      return rows
    },
  },
  Mutation: {
    createProject: async (_, { input }) => {
      const {
        releaseDate,
        name,
        description,
        sourceUrl,
        demoUrl,
        articleUrl,
        authorId,
      } = input
      const { rows } = await pool.query(
        `
        INSERT INTO projects (release_date, name, description, source_url, demo_url, article_url, author_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `,
        [releaseDate, name, description, sourceUrl, demoUrl, articleUrl, authorId],
      )
      return rows[0]
    },
    createPost: async (_, { input }) => {
      const { title, content, authorId, tagIds } = input
      const { rows } = await pool.query(
        `
        INSERT INTO posts (title, content, author_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
        [title, content, authorId],
      )

      const post = rows[0]

      // Assuming tagIds is an array of tag IDs to associate with the post
      for (const tagId of tagIds) {
        await pool.query(
          `
          INSERT INTO tags (post_id, tag_id)
          VALUES ($1, $2)
        `,
          [post.id, tagId],
        )
      }

      return post
    },

    updatePost: async (_, { id, input }) => {
      const { title, content, authorId } = input // Assuming you want to allow updating the author
      const { rows } = await pool.query(
        `
        UPDATE posts
        SET title = $2, content = $3, author_id = $4
        WHERE id = $1
        RETURNING *
      `,
        [id, title, content, authorId],
      )
      return rows[0]
    },

    deletePost: async (_, { id }) => {
      await pool.query('DELETE FROM posts WHERE id = $1', [id])
      return `Post with ID ${id} was deleted successfully.`
    },

    createUser: async (_, { input }) => {
      const { name, email } = input
      const { rows } = await pool.query(
        `
        INSERT INTO users (name, email)
        VALUES ($1, $2)
        RETURNING *
      `,
        [name, email],
      )
      return rows[0]
    },

    createComment: async (_, { input }) => {
      const { content, postId, authorId } = input
      const { rows } = await pool.query(
        `
        INSERT INTO comments (content, post_id, author_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
        [content, postId, authorId],
      )
      return rows[0]
    },

    createTag: async (_, { name }) => {
      const { rows } = await pool.query(
        `
        INSERT INTO tags (name)
        VALUES ($1)
        RETURNING *
      `,
        [name],
      )
      return rows[0]
    },

    favoritePost: async (_, { userId, postId }) => {
      await pool.query(
        `
        INSERT INTO post_favorites (user_id, post_id, favorited_at)
        VALUES ($1, $2, NOW())
      `,
        [userId, postId],
      )
      return resolvers.Query.getUser(_, { id: userId }) // Reuse the getUser query resolver to return the updated user
    },

    unfavoritePost: async (_, { userId, postId }) => {
      await pool.query(
        `
        DELETE FROM post_favorites
        WHERE user_id = $1 AND post_id = $2
      `,
        [userId, postId],
      )
      return resolvers.Query.getUser(_, { id: userId }) // Reuse the getUser query resolver to return the updated user
    },

    // Assuming similar structures for projects as for posts
    updateProject: async (_, { id, input }) => {
      const {
        releaseDate,
        name,
        description,
        sourceUrl,
        demoUrl,
        articleUrl,
        authorId,
      } = input
      const { rows } = await pool.query(
        `
        UPDATE projects
        SET release_date = $2, name = $3, description = $4, source_url = $5, demo_url = $6, article_url = $7, author_id = $8
        WHERE id = $1
        RETURNING *
      `,
        [id, releaseDate, name, description, sourceUrl, demoUrl, articleUrl, authorId],
      )
      return rows[0]
    },

    deleteProject: async (_, { id }) => {
      await pool.query('DELETE FROM projects WHERE id = $1', [id])
      return `Project with ID ${id} was deleted successfully.`
    },

    // Assuming favorite and unfavorite operations for projects are similar to those for posts
    favoriteProject: async (_, { userId, projectId }) => {
      await pool.query(
        `
        INSERT INTO project_favorites (user_id, project_id, favorited_at)
        VALUES ($1, $2, NOW())
      `,
        [userId, projectId],
      ) // Assumes existence of a project_favorites table
      return resolvers.Query.getUser(_, { id: userId })
    },

    unfavoriteProject: async (_, { userId, projectId }) => {
      await pool.query(
        `
        DELETE FROM project_favorites
        WHERE user_id = $1 AND project_id = $2
      `,
        [userId, projectId],
      ) // Assumes existence of a project_favorites table
      return resolvers.Query.getUser(_, { id: userId })
    },
  },
  User: {
    posts: async (user) => {
      const { rows } = await pool.query('SELECT * FROM posts WHERE author_id = $1', [
        user.id,
      ])
      return rows
    },
    comments: async (user) => {
      const { rows } = await pool.query('SELECT * FROM comments WHERE author_id = $1', [
        user.id,
      ])
      return rows
    },
    post_favorites: async (user) => {
      const { rows } = await pool.query(
        'SELECT * FROM post_favorites WHERE post_favorites.user_id = $1',
        [user.id],
      )
      return rows
    },
    project_favorites: async (user) => {
      const { rows } = await pool.query(
        'SELECT * FROM project_favorites WHERE project_favorites.user_id = $1',
        [user.id],
      )
      return rows
    },
  },
  Post: {
    author: async (post) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        post.author_id,
      ])
      return rows[0]
    },
    tags: async (post) => {
      const { rows } = await pool.query(
        'SELECT tags.* FROM tags JOIN tags ON tags.tag_id = tags.id WHERE tags.post_id = $1',
        [post.id],
      )
      return rows
    },
    comments: async (post) => {
      const { rows } = await pool.query('SELECT * FROM comments WHERE post_id = $1', [
        post.id,
      ])
      return rows
    },
  },
  Project: {
    author: async (project) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        project.author_id,
      ])
      return rows[0]
    },
  },
  Comment: {
    author: async (comment) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        comment.author_id,
      ])
      return rows[0]
    },
    post: async (comment) => {
      const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [
        comment.post_id,
      ])
      return rows[0]
    },
  },
  Tag: {
    posts: async (tag) => {
      const { rows } = await pool.query(
        `
        SELECT posts.* FROM tags
        JOIN posts ON tags.post_id = posts.id
        WHERE tags.tag_id = $1
      `,
        [tag.id],
      )
      return rows
    },
  },
  Post_Favorite: {
    id: (postFavorite) => postFavorite.id,
    user: async (postFavorite) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        postFavorite.user_id,
      ])
      return rows[0]
    },
    post: async (postFavorite) => {
      const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [
        postFavorite.post_id,
      ])
      return rows[0]
    },
    favorited_at: (postFavorite) => postFavorite.favorited_at,
  },

  Project_Favorite: {
    id: (projectFavorite) => projectFavorite.id,
    user: async (projectFavorite) => {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [
        projectFavorite.user_id,
      ])
      return rows[0]
    },
    project: async (projectFavorite) => {
      const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1', [
        projectFavorite.project_id,
      ])
      return rows[0]
    },
    favorited_at: (projectFavorite) => projectFavorite.favorited_at,
  },
}

module.exports = resolvers

module.exports = {
  mongoData: {
    ip: 'localhost',
    port: 27017,
    user: 'root',
    password: 'toor',
    db: 'blog'
  },
  statusCodes: {
    OK: 200,
    Unauthorized: 401,
    Conflict: 409
  },
  expressData: {
    port: 1811
  },
  posts: {
    postsPerPage: 10
  },
  upload: {
    directory: 'images/uploads/',
    gallery: 'gallery/',
    posts: 'posts/',
    avatars: 'avatars/'
  },
  autoSave: true,
  autoSaveInterval: 24 * 60 * 60 * 1000, // Hours -> Minutes -> Seconds -> Miliseconds
  autoSaveDirectory: 'autosave/'
}

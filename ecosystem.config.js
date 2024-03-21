module.exports = {
    apps: [
      {
        name: 'NextApp',
        script: 'npm',
        args: 'run start -- -p 8081'
      },
      {
        name: 'ExpressAPI',
        script: './backend/index.js', // Path to your Express server entry file
      },
    ],
  };
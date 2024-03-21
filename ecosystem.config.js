module.exports = {
    apps: [
      {
        name: 'NextApp',
        script: 'npm',
        args: 'run start', // Assumes your package.json has a "start" script for Next.js
      },
      {
        name: 'ExpressAPI',
        script: './index.js', // Path to your Express server entry file
      },
    ],
  };
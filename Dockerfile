# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json, package-lock.json/yarn.lock files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies including PM2 globally
RUN npm install --frozen-lockfile && npm install pm2 -g

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Copy your PM2 ecosystem configuration file
COPY ecosystem.config.js .

# Build your Next.js app. Remember to include environment variables if necessary.
RUN npm run build

# Start both Next.js and Express applications using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
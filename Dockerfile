# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json, package-lock.json/yarn.lock files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build your Next.js app. Remember to include environment variables if necessary.
RUN npm run build

# If you are using the default Next.js server, specify the command to start it.
CMD ["npm", "start"]
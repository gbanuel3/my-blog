# Use the official lightweight Node.js 18 image.
FROM node:18-slim

# Set the working directory in the container
WORKDIR /app

# Copy package.json, and package-lock.json/yarn.lock files
COPY package.json package-lock.json* yarn.lock* ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Build your Next.js app
RUN npm run build

# Start the Express server that serves both Next.js content and your GraphQL endpoint
CMD ["node", "backend/index.js"]
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including devDependencies for the build)
RUN npm install

# Copy the entire source code
COPY . .

# Accept a build-time argument and set as env variable
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL

# Build the Next.js app
RUN npm run build

# Remove devDependencies to reduce image size (optional optimization)
RUN npm prune --production

# Expose app port
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
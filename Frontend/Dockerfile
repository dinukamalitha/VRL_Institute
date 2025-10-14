# Use official node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm install

# Copy the rest of the files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application (dev mode)
CMD ["npm", "run", "dev"]

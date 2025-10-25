# Use an official Node.js image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install ALL dependencies (including dev)
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Define environment variable
ENV NODE_ENV=development

# Start the application
CMD ["npm", "start"]

## Use official node.js image
#FROM node:20-alpine
#
## Set working directory
#WORKDIR /app
#
## Install dependencies
#COPY package*.json ./
#
## Install ALL dependencies (including dev)
#RUN npm install
#
## Copy the rest of the files
#COPY . .
#
## Expose the port your app runs on
#EXPOSE 3000
#
## Start the application (dev mode)
#CMD ["npm", "run", "dev"]

# Dockerfile for Frontend (Production)

# ---- Stage 1: The Builder ----
# This stage installs all dependencies (including devDependencies)
# and builds the Next.js application.
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and lock files
COPY package*.json ./

# Install all dependencies needed for the build
RUN npm install

# Copy the rest of the source code
COPY . .

# *** THIS IS THE CRITICAL MISSING STEP ***
# Run the build script to create the .next directory
RUN npm run build


# ---- Stage 2: The Production Image ----
# This stage starts from a fresh image and copies only the
# built application and production dependencies.
FROM node:20-alpine

WORKDIR /app

# Copy only the necessary files from the 'builder' stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next

# Install ONLY the production dependencies
RUN npm install --production

# Expose the port the application will run on
EXPOSE 3000

# The command to start the optimized production server
CMD ["npm", "start"]
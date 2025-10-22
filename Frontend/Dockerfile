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
ARG NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ARG NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=$NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
ENV NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=$NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

# Build the Next.js app
RUN npm run build

# Remove devDependencies to reduce image size (optional optimization)
RUN npm prune --production

# Create logs directory with correct permissions
RUN mkdir -p log/frontend && chmod 755 log

# Expose app port
EXPOSE 3000

# Start the production server and log output to both console & file
CMD sh -c "npm run start | tee -a log/frontend/app.log"

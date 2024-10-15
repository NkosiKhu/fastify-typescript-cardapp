# Use the base image from the devcontainer for simplicity sake
FROM mcr.microsoft.com/devcontainers/typescript-node

#install sqlite
RUN apt-get update && apt-get install -y sqlite3

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Run Prisma setup for the prod database
RUN npm run prisma-setup-prod

# Expose the port that the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
#!/bin/bash

# Set up Docker buildx builder
docker buildx create --name container-builder --driver docker-container --use --bootstrap

# Define image names
FRONTEND_IMAGE="nkosikhu/cardapp-front"
BACKEND_IMAGE="nkosikhu/cardapp-back"

# Build and push the frontend image
echo "Building and pushing frontend image..."
docker buildx build --platform linux/amd64,linux/arm64 -t $FRONTEND_IMAGE -f ./frontend/Dockerfile ./frontend --push

# Run backend tests
echo "Running backend tests..."
cd backend
npm run test

# Check if tests passed
if [ $? -ne 0 ]; then
  echo "Tests failed. Aborting build."
  exit 1
fi
cd ../
# Build and push the backend image
echo "Building and pushing backend image..."
docker buildx build --platform linux/amd64,linux/arm64 -t $BACKEND_IMAGE -f ./backend/Dockerfile ./backend --push

echo "Deployment completed successfully."
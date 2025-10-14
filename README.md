# VRL_Institute

# Runs the docker containers
docker compose up

# Forces rebuild of images if you made changes to Dockerfiles or dependencies.
docker compose up --build -d

-- build -> rebuilds the images
-d -> runs containers in detached mode (background)

# check running containers
docker ps

# stop containers
docker-compose down
# VRL_Backend

# Build the docker image
docker build -t vrl-backend .

# Run the docker image (.env is manually loaded)
docker run -it -p 5000:5000 --env-file .env vrl-backend

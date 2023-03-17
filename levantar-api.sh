docker build -t api-imagen -f ./Dockerfile .
docker-compose -f docker-compose.yml down
docker-compose -f docker-compose.yml up -d
#!/bin/bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# Prepare constants
MYSQL_ROOT_PASSWORD=root
CONTAINER_NAME=hotel-mysql-container
IMAGE_NAME=mysql-server

# Load environment variables from .env file
set -o allexport
source .env

# Check the status of the container
container_status=$(docker ps -a -f name=$CONTAINER_NAME --format "{{.Status}}")

build_mysql() {
    # create new init script from .env DB_NAME
    sed "s/{{DATABASE}}/$DB_NAME/g" $SCRIPT_DIR/mysql/init_template.sql > $SCRIPT_DIR/mysql/init.sql

    echo "Creating MySQL image..."
    docker build -t $IMAGE_NAME:latest $SCRIPT_DIR/mysql \
        --build-arg MYSQL_ROOT_PASSWORD_ARG=$MYSQL_ROOT_PASSWORD \
        --build-arg MYSQL_DATABASE_ARG=$DB_NAME \
        --build-arg MYSQL_USER_ARG=$DB_USER \
        --build-arg MYSQL_PASSWORD_ARG=$DB_PASSWORD
    sleep 1
}

wait_for_mysql() {
    echo "Waiting for MySQL to be ready..."
    while ! docker exec $CONTAINER_NAME mysqladmin ping -h "127.0.0.1" --silent; do
        echo -n "."
        sleep 1
    done
    echo && echo "MySQL is ready!"
    docker ps
}

start_container() {
    if [ -z "$container_status" ]; then
        echo "Starting a new MySQL container..."
        build_mysql
        docker run --name $CONTAINER_NAME -p 3300:3306 -d $IMAGE_NAME:latest
        wait_for_mysql
    elif [[ "$container_status" == *"Exited"* ]]; then
        docker container rm $CONTAINER_NAME
        docker image rm $IMAGE_NAME
        echo "Starting the existing MySQL container..."
        build_mysql
        docker run --name $CONTAINER_NAME -p 3300:3306 -d $IMAGE_NAME:latest
        wait_for_mysql
    else
        echo "MySQL container is already running."
    fi
}

stop_container() {
    if [[ "$container_status" == *"Up"* ]]; then
        echo "Stopping the MySQL container..."
        docker stop $CONTAINER_NAME
        docker ps
    else
        echo "MySQL container is not running."
    fi
}

# Main script logic
case "$1" in
    start)
        start_container
        ;;
    stop)
        stop_container
        ;;
    *)
        echo "Usage: $0 {start|stop}"
        ;;
esac

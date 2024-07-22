# Hotel Booking System

## MySQL database setup

You will need to install Docker from https://www.docker.com/products/docker-desktop/. You do not need to create an account.

Run your backend services first.

It is assumed here that:
- the docker version of mysql will be used
- bash, git bash or wsl is being used

```bash
hotel-booking-system $
hotel-booking-system $ cd server
hotel-booking-system/server $ npm install
hotel-booking-system/server $ chmod 755 ./run_mysql.sh
hotel-booking-system/server $ ./run_mysql.sh start # run mysql docker
hotel-booking-system/server $ npm run start
```

You can then run your client (frontend).

```bash
hotel-booking-system $
hotel-booking-system $ cd client
hotel-booking-system/client $ npm install
hotel-booking-system/client $ npm run start
```

FROM node:20.11.0-alpine3.19
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 4000

ENV MONGO_USERNAME=fauverick
ENV MONGO_PASSWORD=1234
ENV MONGO_URL=fauverick.y3bz2tg.mongodb.net
ENV MONGO_DB=DERANGER
ENV JWT_SECRET=jwtSecret
ENV JWT_LIFETIME=1d
ENV PORT=4000

# ENV FRONTEND_URL=http://localhost:8080/


CMD [ "node", "app.js"]
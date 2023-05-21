FROM node:19.3.0-alpine

WORKDIR /app

ADD package.json ./
ADD yarn.lock ./

RUN yarn install

ADD . .
CMD [ "node", "app.js"]
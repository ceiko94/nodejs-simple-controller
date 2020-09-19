FROM node:lts-alpine3.10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_IP=10.0.1.5

CMD [ "node", "app.js" ]

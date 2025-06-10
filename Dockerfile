FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache git openssl

COPY . .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
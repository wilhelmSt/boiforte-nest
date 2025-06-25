FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache git openssl

COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 3000
CMD ["npm", "run", "docker:dev"]
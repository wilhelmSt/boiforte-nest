# Dockerfile
FROM node:18-alpine

WORKDIR /usr/src/app

# Instala dependências de build
RUN apk add --no-cache git

# Copia os arquivos de configuração
COPY package*.json ./
COPY prisma ./prisma/

# Instala dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Compila o projeto
RUN npm run build

# Expõe a porta e inicia a aplicação
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 80:3001

RUN npm run build


# RUN npm run migration:run

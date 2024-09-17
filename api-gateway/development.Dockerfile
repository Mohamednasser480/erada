FROM node:18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
EXPOSE 3000:3000
RUN npm run build


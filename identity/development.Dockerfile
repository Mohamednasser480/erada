FROM node:18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# CMD ["npm", "run", "start:dev"]


# RUN npm run migration:run

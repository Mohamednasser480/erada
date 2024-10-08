FROM node:18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

# RUN npm run migration:run

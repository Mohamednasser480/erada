FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 80:3001

CMD [ "npm", "start" ]
# RUN npm run migration:run

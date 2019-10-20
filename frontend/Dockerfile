FROM node:10.16.3
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run ng lint
EXPOSE 4200

CMD ["npm", "run", "ng", "serve"]

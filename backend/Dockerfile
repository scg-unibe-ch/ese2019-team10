FROM node:10.16.3 as backend-dev

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# copy code and build app
COPY . .
RUN npm run tslint && \
    npm run tsc

# run app
CMD [ "node", "./build/server.js" ]

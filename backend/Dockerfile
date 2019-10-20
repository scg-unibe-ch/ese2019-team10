FROM node:10.16.3 as backend-dev

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# copy code and build app
COPY . .
RUN chmod +x *.sh
RUN npm run tslint app/*.ts app/*/*.ts && \
    npm run tsc

# run app
CMD [ "node", "./build/server.js" ]

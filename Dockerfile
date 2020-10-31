FROM node:12-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN apk add curl
RUN apk add rsync
EXPOSE 8081
CMD [ "npm", "start" ]
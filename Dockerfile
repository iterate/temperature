FROM node:7.5.0-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ENV NODE_ENV production
COPY package.json /usr/src/app
RUN npm install && npm cache clean
COPY . /usr/src/app

EXPOSE 8080

CMD ["npm", "start"]

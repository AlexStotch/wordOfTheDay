FROM node:latest

RUN mkdir /slack
WORKDIR /slack

COPY package.json .
RUN npm install

COPY . /slack

CMD [ "npm", "run", "slack" ]
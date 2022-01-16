FROM node:latest

RUN mkdir /slack
WORKDIR /slack

COPY slack/package.json .
RUN npm install

COPY slack /slack

CMD [ "npm", "run", "slack" ]
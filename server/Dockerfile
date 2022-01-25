FROM node:latest

RUN mkdir /server
WORKDIR /server

COPY package.json .
RUN npm install

COPY . /server

CMD [ "npm", "build"]
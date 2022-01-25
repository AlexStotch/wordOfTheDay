FROM node:latest

RUN mkdir /front
WORKDIR /front

COPY package.json .
RUN npm install

COPY . /front

EXPOSE 3000

CMD [ "npm", "run", "build" ]
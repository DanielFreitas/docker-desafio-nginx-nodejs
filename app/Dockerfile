FROM node:10.14

WORKDIR /home/node/app

COPY package.json .

RUN npm install --quiet

COPY . .

EXPOSE 3000

USER node
FROM node:10
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm i --save react-scripts
COPY . .
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]

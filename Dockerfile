FROM node:14.14-alpine as build

WORKDIR /app

COPY ["./package*.json", "/app/"]
RUN npm install --silent
COPY . ./

EXPOSE 3001

CMD npm start

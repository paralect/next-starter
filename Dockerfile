FROM --platform=linux/amd64 node:16.13.1-alpine3.13

EXPOSE 3002

WORKDIR /app
COPY ["./package*.json", "/app/"]
RUN npm ci --quiet

COPY . ./

CMD npm run build && npm start
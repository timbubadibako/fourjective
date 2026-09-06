FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache poppler-utils

COPY package*.json ./
RUN npm ci

COPY . .

RUN mkdir -p /app/uploads

EXPOSE 3000

CMD ["npm", "run", "start"]

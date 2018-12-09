FROM node:8.9-alpine

RUN mkdir -p /app
WORKDIR /app

RUN npm config set registry https://registry.npmjs.org

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install && npm cache clean --force && mv /app/node_modules /node_modules

COPY . /app

ENV PORT 3001
ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]
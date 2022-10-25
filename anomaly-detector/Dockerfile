FROM node:14.18.1
WORKDIR /app
COPY package.json ./app
COPY . /app
RUN yarn install
RUN yarn build
WORKDIR /app
CMD yarn start
FROM node:lts-fermium

ENV DOCKERIZE_VERSION v0.6.1

RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
  && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY packages/web/package.json packages/web/
RUN cd packages/web/ && yarn install
COPY packages/web/ packages/web/
RUN cd packages/web && yarn build

COPY packages/server/package.json packages/server/
RUN cd packages/server/ && yarn install
COPY packages/server/ packages/server/
RUN cd packages/server && yarn build

EXPOSE 8000

WORKDIR /app/packages/server

ENTRYPOINT [ "yarn", "start:production" ]
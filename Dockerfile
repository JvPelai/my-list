FROM node:lts-fermium

WORKDIR /app

COPY package.json ./
RUN yarn

COPY packages/web/ packages/web/
RUN cd packages/web/ && yarn install && yarn build
EXPOSE 3000

COPY packages/server/ packages/server/
RUN cd packages/server/ && yarn install && yarn build

EXPOSE 8000

WORKDIR /app

ENTRYPOINT [ "yarn", "start:production" ]
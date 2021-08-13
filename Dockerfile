FROM node:lts-fermium


WORKDIR /app
RUN yarn global add typescript

COPY package*.json ./
RUN yarn

COPY packages/web/package*.json packages/web/
RUN cd packages/web && yarn
COPY packages/web packages/web
RUN yarn build-web

COPY packages/server/package*.json packages/server/
RUN cd packages/server && yarn
COPY packages/server/ packages/server/
RUN yarn build-server

EXPOSE 8000

ENTRYPOINT [ "yarn", "start" ]
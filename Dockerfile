FROM node:16 as install
LABEL stage=install

WORKDIR /app
COPY --chown=node:node ./api_nest/package.json .
COPY --chown=node:node ./api_nest/yarn.lock .
RUN yarn install --force

COPY --chown=node:node ./api_nest .

RUN yarn build

ENV NODE_ENV production
RUN yarn config set network-timeout 60000
RUN yarn install --production=true && yarn cache clean --force

# FROM nginx:1.19.0-alpine as deploy
FROM node:16-alpine as install
COPY --from=install /app/dist/main.js /usr/share/nginx/html/index.js
COPY --from=install /app/node_modules /usr/share/nginx/html/node_modules
EXPOSE 3000

# CMD [ "nginx", "-g", "daemon off;" ]
CMD ["node", "dist/main"]
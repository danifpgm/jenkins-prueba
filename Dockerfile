# FROM node:16 as install
# LABEL stage=install

# WORKDIR /app
# COPY --chown=node:node ./api_nest/package.json .
# COPY --chown=node:node ./api_nest/yarn.lock .
# RUN yarn install --force

# COPY --chown=node:node ./api_nest .

# RUN yarn build

# ENV NODE_ENV production
# RUN yarn config set network-timeout 60000
# RUN yarn install --production=true && yarn cache clean --force

# # FROM nginx:1.19.0-alpine as deploy
# FROM node:18-alpine as produccion
# WORKDIR /produccion
# COPY --chown=node:node --from=install /app/dist/main.js ./index.js
# COPY --chown=node:node --from=install /app/node_modules ./node_modules
# EXPOSE 3000

# # CMD [ "nginx", "-g", "daemon off;" ]
# CMD ["node", "dist/main"]






# # ---------------------------------------








FROM node:18 As development

WORKDIR /usr/src/app

COPY --chown=node:node ./api_nest/package*.json ./
COPY --chown=node:node ./api_nest/yarn.lock ./

RUN npm install --only=development

COPY ./api_nest .

RUN yarn build

FROM node:18-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
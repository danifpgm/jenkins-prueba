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

FROM node:18-alpine AS builder
WORKDIR "/app"
COPY ./api_nest .
RUN yarn install --immutable --immutable-cache --check-cache
RUN yarn run build
RUN yarn config set network-timeout 60000
RUN yarn install --production=true && yarn cache clean --force

FROM node:18-alpine AS production
WORKDIR "/app"
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
CMD [ "sh", "-c", "npm run start:prod"]
FROM node:16 as install
LABEL stage=install
ARG USUARIO
ARG PASSWD
ARG DB
ARG USUARIO_DB
ARG PASSWD_DB
ARG DB_IP
ARG DB_PORT
ARG PUERTO
ARG JWT

ENV USUARIO=${USUARIO}
ENV PASSWD=${PASSWD}
ENV TZ=${TZ}
ENV DB_IP=${DB_IP}
ENV DB_NAME=${DB_NAME}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWD=${DB_PASSWD}
ENV DB_PORT=${DB_PORT}
ENV PUERTO=${PUERTO}
ENV JWT=${JWT}

WORKDIR /app
COPY --chown=node:node ./api_nest/package.json .
COPY --chown=node:node ./api_nest/yarn.lock .
RUN yarn install --force

COPY --chown=node:node ./api_nest .

RUN yarn build
ENV NODE_ENV production
RUN yarn config set network-timeout 60000
RUN yarn install --production=true && yarn cache clean --force

FROM nginx:1.19.0-alpine as deploy
COPY --from=install /app/dist/main.js /usr/share/nginx/html/index.js
COPY --from=install /app/node_modules /usr/share/nginx/html/node_modules
EXPOSE 3000

CMD [ "nginx", "-g", "daemon off;" ]
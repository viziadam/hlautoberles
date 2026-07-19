# syntax=docker/dockerfile:1

FROM node:lts-alpine AS build

WORKDIR /bookcars/admin

COPY ./admin ./
COPY ./admin/.env.docker .env
COPY ./admin/.env.docker .env.production
COPY ./packages /bookcars/packages

RUN npm install --force
RUN npm run build


FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf /usr/share/nginx/html/* \
    && mkdir -p /usr/share/nginx/html/admin

COPY --from=build \
  /bookcars/admin/build/ \
  /usr/share/nginx/html/admin/

COPY ./admin/nginx.conf \
  /etc/nginx/conf.d/default.conf

EXPOSE 3001

CMD ["nginx", "-g", "daemon off;"]

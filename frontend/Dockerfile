# syntax=docker/dockerfile:1

FROM node:lts-alpine AS build

WORKDIR /bookcars/frontend

COPY ./frontend ./
COPY ./frontend/.env.docker .env
COPY ./frontend/.env.docker .env.production
COPY ./packages /bookcars/packages

RUN npm install --force
RUN npm run build

FROM nginx:stable-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf -- * \
    && mkdir -p /etc/nginx/snippets

COPY --from=build /bookcars/frontend/build .

COPY --from=build \
  /bookcars/frontend/generated/seo-routes.conf \
  /etc/nginx/snippets/seo-routes.conf

COPY ./frontend/nginx.conf \
  /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80

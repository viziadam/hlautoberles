# syntax=docker/dockerfile:1

FROM nginx:stable-alpine

COPY ./gateway/entrypoint.sh /entrypoint.sh
COPY ./gateway/nginx.conf.template /etc/nginx/conf.d/default.conf.template

RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/entrypoint.sh"]

#!/bin/sh
set -eu

FRONTEND_UPSTREAM="${FRONTEND_UPSTREAM:-${FRONTEND_URL:-}}"
ADMIN_UPSTREAM="${ADMIN_UPSTREAM:-${ADMIN_URL:-}}"
BACKEND_UPSTREAM="${BACKEND_UPSTREAM:-${BACKEND_URL:-}}"
PORT="${PORT:-8080}"

: "${FRONTEND_UPSTREAM:?Set FRONTEND_UPSTREAM (or FRONTEND_URL) to the frontend service URL (e.g. https://frontend-production.up.railway.app)}"
: "${ADMIN_UPSTREAM:?Set ADMIN_UPSTREAM (or ADMIN_URL) to the admin service URL (e.g. https://admin-production.up.railway.app)}"
: "${BACKEND_UPSTREAM:?Set BACKEND_UPSTREAM (or BACKEND_URL) to the backend service URL (e.g. https://backend-production.up.railway.app)}"

export FRONTEND_UPSTREAM ADMIN_UPSTREAM BACKEND_UPSTREAM PORT

envsubst '$FRONTEND_UPSTREAM $ADMIN_UPSTREAM $BACKEND_UPSTREAM $PORT' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'


# server {
#   listen 8080;
#   server_name _;

#   client_max_body_size 50m;

#   location /api/ {
#     proxy_pass ${BACKEND_UPSTREAM};
#     proxy_http_version 1.1;
#     proxy_set_header Host $proxy_host;
#     proxy_set_header X-Forwarded-Host $host;
#     proxy_set_header X-Forwarded-Proto $scheme;
#     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#     proxy_ssl_server_name on;
#     proxy_ssl_name $proxy_host;
#   }

#   location /admin/ {
#     proxy_pass ${ADMIN_UPSTREAM}/;
#     proxy_http_version 1.1;
#     proxy_set_header Host $proxy_host;
#     proxy_set_header X-Forwarded-Host $host;
#     proxy_set_header X-Forwarded-Proto $scheme;
#     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#     proxy_ssl_server_name on;
#     proxy_ssl_name $proxy_host;
#   }

#   location / {
#     proxy_pass ${FRONTEND_UPSTREAM};
#     proxy_http_version 1.1;
#     proxy_set_header Host $proxy_host;
#     proxy_set_header X-Forwarded-Host $host;
#     proxy_set_header X-Forwarded-Proto $scheme;
#     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#     proxy_ssl_server_name on;
#     proxy_ssl_name $proxy_host;
#   }
# }

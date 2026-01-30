#!/bin/sh
set -eu

: "${FRONTEND_UPSTREAM:?Set FRONTEND_UPSTREAM to the frontend service URL (e.g. https://frontend-production.up.railway.app)}"
: "${ADMIN_UPSTREAM:?Set ADMIN_UPSTREAM to the admin service URL (e.g. https://admin-production.up.railway.app)}"
: "${BACKEND_UPSTREAM:?Set BACKEND_UPSTREAM to the backend service URL (e.g. https://backend-production.up.railway.app)}"

envsubst '$FRONTEND_UPSTREAM $ADMIN_UPSTREAM $BACKEND_UPSTREAM' \
  < /etc/nginx/conf.d/default.conf.template \
  > /etc/nginx/conf.d/default.conf

exec nginx -g 'daemon off;'

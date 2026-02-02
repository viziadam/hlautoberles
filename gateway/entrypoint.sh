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

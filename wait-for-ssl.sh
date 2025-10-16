#!/bin/sh

echo "Waiting for SSL certificates to be generated..."

# Wait for both certificate files to exist
while [ ! -f /etc/nginx/ssl/server.crt ] || [ ! -f /etc/nginx/ssl/server.key ]; do
    echo "SSL certificates not found, waiting 2 seconds..."
    sleep 2
done

echo "SSL certificates found! Starting nginx..."

# Start nginx
exec nginx -g "daemon off;"
